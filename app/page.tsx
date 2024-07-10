import Link from "next/link";
import MyProfilePic from "./components/MyProfilePic";

export default function Home() {
  return (
    <main className="px-6 pb-12 mx-auto">
      <MyProfilePic />
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello 🤘 I&apos;m <strong>Jared</strong>! Welcome to my website!
      </p>
      <p className="text-2xl text-center mb-10">
        Check out projects I&apos;ve completed here:
        <Link href="/projects">
          <span className="ml-2 underline-offset-8 hover:underline">
            Projects
          </span>
        </Link>
      </p>
      <p className="text-2xl text-center">
        Check my blog here:
        <Link href="/blog">
          <span className="ml-2 underline-offset-8 hover:underline">Blog</span>
        </Link>
      </p>
    </main>
  );
}
