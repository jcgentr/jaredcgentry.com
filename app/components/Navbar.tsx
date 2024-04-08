import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="text-white/90 no-underline hover:text-white"
          >
            Jared C Gentry
          </Link>
        </h1>
        <div className="flex flex-row justify-center items-center sm:justify-evenly gap-4 text-white">
          <Link
            className="text-white/90 hover:text-white no-underline hover:underline underline-offset-8"
            href="/life-calendar"
          >
            Life Calendar
          </Link>
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
      </div>
    </nav>
  );
}
