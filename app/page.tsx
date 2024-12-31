"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { gradient } from "@/components/Gradient";
import { useEffect } from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to the US Citizenship Test</h1>
      <p className="text-lg mb-6">Practice civics and yes/no questions with AI assistance.</p>
      <nav className="space-x-4">
        <Link
          href="/civics"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Civics Questions
        </Link>
        <Link
          href="/yesno"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Yes/No Questions
        </Link>
      </nav>
    </main>
  );
}