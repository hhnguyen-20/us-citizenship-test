// components/Navbar.tsx
"use client";
// Keep this if you have any client-side interaction (like toggles) planned

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-indigo-600 px-4 py-3 shadow-md">
      {/* Logo or Title */}
      <div className="text-white">
        <Link href="/" className="text-2xl font-bold hover:text-indigo-300">
          USCIS Prep
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex space-x-4">
        <Link
          href="/civics"
          className="rounded px-3 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Civics
        </Link>

        <Link
          href="/yesno"
          className="rounded px-3 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Yes/No
        </Link>

        <Link
          href="/readingandwriting"
          className="rounded px-3 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Reading/Writing
        </Link>

        <Link
          href="/meaning"
          className="rounded px-3 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Meaning
        </Link>
      </nav>
    </header>
  );
}
