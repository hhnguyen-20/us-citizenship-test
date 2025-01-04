"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-8 py-20 text-center bg-gray-50 overflow-hidden min-h-screen">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0" />

      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/flag.png"
          alt="U.S. Flag background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Hero Text */}
      <h1 className="relative z-10 text-5xl font-bold text-white drop-shadow-md">
        Welcome to USCIS Prep
      </h1>
      <p className="relative z-10 max-w-2xl text-lg text-white drop-shadow-sm">
        Prepare for your U.S. Citizenship Test with engaging questions and practice exercises.
      </p>

      {/* Cards */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Civics */}
        <div className="rounded bg-white p-4 shadow transition-transform hover:shadow-lg hover:scale-105">
          <h2 className="mb-2 text-xl font-semibold text-indigo-600">Civics</h2>
          <p className="mb-2 text-sm text-gray-600">
            Over 100 official questions about U.S. history and government.
          </p>
          <Link
            href="/civics"
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-500"
          >
            Practice Now
          </Link>
        </div>

        {/* Yes/No */}
        <div className="rounded bg-white p-4 shadow transition-transform hover:shadow-lg hover:scale-105">
          <h2 className="mb-2 text-xl font-semibold text-green-600">Yes/No</h2>
          <p className="mb-2 text-sm text-gray-600">
            Get ready for interview-style questions about your background.
          </p>
          <Link
            href="/yesno"
            className="inline-block rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-500"
          >
            Practice Now
          </Link>
        </div>

        {/* Reading & Writing */}
        <div className="rounded bg-white p-4 shadow transition-transform hover:shadow-lg hover:scale-105">
          <h2 className="mb-2 text-xl font-semibold text-blue-600">Reading &amp; Writing</h2>
          <p className="mb-2 text-sm text-gray-600">
            Improve your English reading and writing for the interview test.
          </p>
          <Link
            href="/readingandwriting"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-500"
          >
            Practice Now
          </Link>
        </div>

        {/* Meaning */}
        <div className="rounded bg-white p-4 shadow transition-transform hover:shadow-lg hover:scale-105">
          <h2 className="mb-2 text-xl font-semibold text-purple-600">Meaning</h2>
          <p className="mb-2 text-sm text-gray-600">
            Learn important words and their meanings for the civics exam.
          </p>
          <Link
            href="/meaning"
            className="inline-block rounded bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-500"
          >
            Practice Now
          </Link>
        </div>

        {/* Information */}
        <div className="rounded bg-white p-4 shadow transition-transform hover:shadow-lg hover:scale-105">
          <h2 className="mb-2 text-xl font-semibold text-yellow-600">Information</h2>
          <p className="mb-2 text-sm text-gray-600">
            Prepare for the personal information section of the interview.
          </p>
          <Link
            href="/information"
            className="inline-block rounded bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-500"
          >
            Practice Now
          </Link>
        </div>
      </div>

      {/* Mock Test CTA */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-2">
        <p className="text-sm text-white drop-shadow-sm">
          Ready for a full, randomized practice session?
        </p>
        <Link
          href="/mocktest"
          className="rounded bg-red-600 px-4 py-2 text-white shadow-md transition hover:bg-red-500"
        >
          Start Mock Test
        </Link>
      </div>
    </section>
  );
}
