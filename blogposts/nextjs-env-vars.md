---
title: "Configuring NextJS Environment Variables at Runtime"
date: "2023-12-7"
---

Changing environment variables in NextJS can be tricky. Depending on where the environment variables are used, they can be inlined at build time or referenced at runtime.

Our project was using environment variables inside the `rewrites` property of in the `next.config.js` file. These rewrites were acting as a reverse proxy that could reroute API calls from the frontend to API microservices in our Kubernetes cluster.

In a given Kubernetes environment, say dev or prod, we should be able to update the environment variables in `.env.production` and have them be picked up when the app starts. However, references to `process.env` in `next.config.js` results in inlined or hard-coded values at _build time_. This makes it impossible to change these environment variables based on the given deployment environment.

This is also the case with client-side variables that use the `process.env.NEXT_PUBLIC` prefix. This makes sense since client components will be bundled at build time and environment variables need to be hard-coded at that point in time to be included in the build output. So how did we go about solving these two issues?

## Server-side solution

To resolve the `next.config.js` issue, I found [this github issue](https://github.com/vercel/next.js/issues/21888) helpful. The suggestion is to use a middleware to do rewrites instead of the `next.config.js` since environment variables in `middleware.ts` will not be inlined at build time. This means changes to `.env.production` right before runtime will be picked up and referenced by the server.

So the solution was to transition all rewrites to [that middleware file](https://nextjs.org/docs/app/building-your-application/routing/middleware). This proved not too difficult as there was [decent documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements) on how to implement matchers and path rewrites.

#### next.config.js (before)

```js
/** @type {import('next').NextConfig} */
const webpack = require("webpack");

module.exports = {
  output: "standalone",
  ...
  async rewrites() {
    return [
      {
        source: "/api-1/:path*",
        destination: process.env.API_1_URL + "/:path*",
      },
      {
        source: "/api-2/:path*",
        destination: process.env.API_2_URL + "/:path*",
      },
    ];
  },
  ...
};
```

#### middleware.ts (after)

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api-1/")) {
    const api1 = new URL(process.env.API_1_URL as string);
    api1.pathname = pathname.replace(/^\/api-1/, "");
    api1.search = request.nextUrl.search;
    return NextResponse.rewrite(api1);
  }

  if (pathname.startsWith("/api-2/")) {
    const api2 = new URL(process.env.API_2_URL as string);
    api2.pathname = pathname.replace(/^\/api-2/, "");
    api2.search = request.nextUrl.search;
    return NextResponse.rewrite(api2);
  }

  // For any other path, return undefined to continue with the default behavior
  return undefined;
}

export const config = {
  matcher: ["/api-1/:path*", "/api-2/:path*"],
};
```

You can test the solution by running `npm run build`, changing env vars in the `.env.production file`, and then running `npm run start` to see these changes picked up during the path rewrites.

## Client-side solution

For the client-side issue, there are a couple of potential solutions. You could return the env vars you need using an API route, but I found this cubersome. I desired the solution with the least impact. I settled on adding a JavaScript file to the public folder (e.g. `/public/config.js`).

#### config.js

```js
window.CLIENT_SIDE_ENV_VAR_1 = "text_1";
window.CLIENT_SIDE_ENV_VAR_2 = "text_2";
window.CLIENT_SIDE_ENV_VAR_3 = "text_3";
```

This script assigned our client-side env vars to the global window object. To load this script on every page of the frontend, NextJS recommends using there [Script component](https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive) in the RootLayout component (e.g. `/app/layout.tsx`). However, I ran into a hydration issue when trying to use the strategy="beforeInteractive" property, so I settled on adding a plain script tag to a plain HTML head tag in the root layout as suggested in [this github issue](https://github.com/vercel/next.js/issues/49830).

```ts
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";

...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="/config.js" />
      </head>
      <body className={inter.className}>...</body>
    </html>
  );
}
```

Since the `RootLayout` is a Server Component, this component should always load and be present on the browser. Therefore, the env vars on the window should be available by the rest of the app. The script will load synchronously before the rest of the app ensuring the env vars are available for the initial API calls the components make after first rendering.

Once again, you can test this setup by doing a build and start. Since this `config.js` file is served from the public folder, you can change the contents during runtime, refresh the page and immediately see changes to your env vars in the window.

And with these two solutions, you can now configure ConfigMaps in Kubernetes to change the contents of the `/public/config.js` and `.env.production` files and have env vars that are appropriate for the given deployment environment.
