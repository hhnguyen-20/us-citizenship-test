"use client";
import Image from "next/image"; // if you need to import an image

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-8 py-20 text-center bg-gray-50">
      {/* Hero image or background */}
      <div className="absolute inset-0">
        <Image
          src="/flag.png"
          alt="Patriotic background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <h1 className="relative text-5xl font-bold text-gray-800 z-10">
        Welcome to USCIS Prep
      </h1>
      <p className="relative max-w-2xl text-lg text-gray-700 z-10">
        Prepare for your U.S. Citizenship Test with engaging questions and practice exercises.
      </p>

      {/* Info cards example */}
      <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl">
        <div className="rounded bg-white p-4 shadow hover:shadow-md transition">
          <h2 className="mb-2 text-xl font-semibold text-indigo-600">Civics</h2>
          <p className="mb-2 text-sm text-gray-600">
            Over 100 official questions about U.S. history and government.
          </p>
          <a
            href="/civics"
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"
          >
            Practice Now
          </a>
        </div>

        <div className="rounded bg-white p-4 shadow hover:shadow-md transition">
          <h2 className="mb-2 text-xl font-semibold text-green-600">Yes/No</h2>
          <p className="mb-2 text-sm text-gray-600">
            Get ready for interview-style questions about your background.
          </p>
          <a
            href="/yesno"
            className="inline-block rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-500"
          >
            Practice Now
          </a>
        </div>

        <div className="rounded bg-white p-4 shadow hover:shadow-md transition">
          <h2 className="mb-2 text-xl font-semibold text-blue-600">Reading &amp; Writing</h2>
          <p className="mb-2 text-sm text-gray-600">
            Improve your English reading and writing for the interview test.
          </p>
          <a
            href="/readingandwriting"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
          >
            Practice Now
          </a>
        </div>

        <div className="rounded bg-white p-4 shadow hover:shadow-md transition">
          <h2 className="mb-2 text-xl font-semibold text-purple-600">Meaning</h2>
          <p className="mb-2 text-sm text-gray-600">
            Learn important words and their meanings for the civics exam.
          </p>
          <a
            href="/meaning"
            className="inline-block rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-500"
          >
            Practice Now
          </a>
        </div>
      </div>

      {/* Additional call-to-action */}
      {/*<div className="relative z-10 flex flex-col items-center gap-2 pt-8">*/}
      {/*  <p className="text-sm text-gray-600">*/}
      {/*    Want more tips? Download our comprehensive study guide.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    href="#"*/}
      {/*    className="rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"*/}
      {/*  >*/}
      {/*    Download PDF*/}
      {/*  </a>*/}
      {/*</div>*/}
    </section>
  );
}
