"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export function ThemeToggle() { const { resolvedTheme, setTheme } = useTheme(); return <button aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="grid size-9 place-items-center rounded-xl border bg-card hover:bg-muted">{resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}</button>; }
