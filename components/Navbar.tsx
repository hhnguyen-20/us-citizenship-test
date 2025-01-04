"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <div className="text-white">
          <Link href="/" className="text-2xl font-bold hover:text-indigo-300">
            USCIS Prep
          </Link>
        </div>

        {/* Desktop Nav (md and above) */}
        <nav className="hidden space-x-4 md:flex">
          <Link
            href="/civics"
            className="rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            Civics
          </Link>
          <Link
            href="/yesno"
            className="rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            Yes/No
          </Link>
          <Link
            href="/readingandwriting"
            className="rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            Reading/Writing
          </Link>
          <Link
            href="/meaning"
            className="rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            Meaning
          </Link>
          <Link
            href="/mocktest"
            className="rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-500"
          >
            Mock Test
          </Link>
        </nav>

        {/* Mobile Hamburger Button (below md) */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu (renders if isOpen && below md) */}
      {isOpen && (
        <nav className="flex flex-col space-y-2 bg-indigo-700 px-4 pb-3 md:hidden">
          <Link
            href="/civics"
            className="block rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Civics
          </Link>
          <Link
            href="/yesno"
            className="block rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Yes/No
          </Link>
          <Link
            href="/readingandwriting"
            className="block rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Reading/Writing
          </Link>
          <Link
            href="/meaning"
            className="block rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Meaning
          </Link>
          <Link
            href="/mocktest"
            className="block rounded px-3 py-2 font-medium text-white transition hover:bg-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Mock Test
          </Link>
        </nav>
      )}
    </header>
  );
}
