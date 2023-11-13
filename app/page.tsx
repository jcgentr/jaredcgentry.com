import Posts from "./components/Posts";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello 🤘 I&apos;m <strong>Jared</strong>! Welcome to my blog!
      </p>
      <Posts />
    </main>
  );
}
