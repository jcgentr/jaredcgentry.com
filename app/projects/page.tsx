export default function ProjectsPage() {
  return (
    <div className="prose prose-xl mx-auto p-10">
      <h1 className="text-2xl dark:text-white">Projects</h1>
      <ul className="mt-10">
        <li>
          <a
            href="https://usstatesinfo.vercel.app/"
            target="_blank"
            className="no-underline hover:underline dark:text-white"
          >
            US States Info
          </a>
        </li>
        <li>
          <a
            href="https://komo-international.vercel.app/"
            target="_blank"
            className="no-underline hover:underline dark:text-white"
          >
            Komo International
          </a>
        </li>
        <li>
          <a
            className="no-underline hover:underline dark:text-white"
            href="https://fs-nextjs-todos.fly.dev/"
            target="_blank"
          >
            Fullstack Todo App
          </a>
        </li>
      </ul>
    </div>
  );
}
