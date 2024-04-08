"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useLayoutEffect } from "react";
import { useTheme } from "next-themes";
import { FaReact } from "react-icons/fa";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useLayoutEffect(() => setMounted(true), []);

  if (!mounted) return <FaReact />;

  if (resolvedTheme === "dark") {
    return <FiSun onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme === "light") {
    return <FiMoon onClick={() => setTheme("dark")} />;
  }
}
