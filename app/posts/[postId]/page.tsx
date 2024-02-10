import getFormattedDate from "@/lib/getFormattedDate";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  const postsOldestToNewest = posts.reverse();
  const postIndex = postsOldestToNewest.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return notFound();
  }

  const hasPrevPost = postIndex > 0;
  const hasNextPost = postIndex < postsOldestToNewest.length - 1;
  const prevPost = postsOldestToNewest[postIndex - 1];
  const nextPost = postsOldestToNewest[postIndex + 1];

  const { title, date, steps, contentHtml } = await getPostData(postId);
  const pubDate = getFormattedDate(date);

  return (
    <main className="mt-10 px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <div className="flex justify-between">
        <p>{pubDate}</p>
        {steps && <p>{steps} steps</p>}
      </div>
      <article className="pb-10">
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
      <footer>
        <div
          className={`flex flex-col md:flex-row gap-2 ${
            hasPrevPost ? "justify-between" : "justify-end"
          }`}
        >
          {hasPrevPost && (
            <Link
              href={`/posts/${prevPost.id}`}
              className="max-w-sm flex justify-center items-center p-4 sm:p-8 rounded-lg border-2 no-underline"
            >
              ←
              <p className="ml-2 truncate underline-offset-8 hover:underline">
                {prevPost.title}
              </p>
            </Link>
          )}
          {hasNextPost && (
            <Link
              href={`/posts/${nextPost.id}`}
              className="max-w-sm flex justify-center items-center p-4 sm:p-8 rounded-lg border-2 no-underline"
            >
              <p className="mr-2 truncate underline-offset-8 hover:underline">
                {nextPost.title}
              </p>
              →
            </Link>
          )}
        </div>
        <div className="my-10">
          <Link
            href="/"
            className="flex justify-center items-center underline-offset-8 no-underline"
          >
            <p className="ml-2 underline-offset-8 hover:underline">
              🏠 Back to home
            </p>
          </Link>
        </div>
      </footer>
    </main>
  );
}
