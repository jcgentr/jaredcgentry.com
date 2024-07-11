import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="p-4 bg-slate-700">
      <h1 className="text-2xl">
        <Link className="text-white/90 hover:text-white no-underline" href="/">
          Jared C Gentry
        </Link>
      </h1>
      <label htmlFor="menu" tabIndex={0}>
        🍔
      </label>
      <input id="menu" type="checkbox" />
      <ul className="flex flex-col sm:flex-row items-center">
        <li>
          <Link
            className="text-white/90 hover:text-white no-underline hover:underline underline-offset-8"
            href="/projects"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            className="text-white/90 hover:text-white no-underline hover:underline underline-offset-8"
            href="/blog"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            className="text-white/90 hover:text-white no-underline hover:underline underline-offset-8"
            href="/favorites"
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link
            className="text-white/90 hover:text-white no-underline hover:underline underline-offset-8"
            href="/life-calendar"
          >
            Life Calendar
          </Link>
        </li>
        <li>
          <div className="flex flex-row gap-2 sm:gap-4 items-center">
            <Link
              className="text-white text-2xl lg:text-3xl hover:opacity-70"
              href="https://github.com/jcgentr"
            >
              <FaGithub />
            </Link>
            <button className="hover:opacity-70">
              <ThemeSwitcher />
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}
