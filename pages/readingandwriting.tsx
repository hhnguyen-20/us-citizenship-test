"use client";

import React, { useState } from "react";
import readingAndWritingTest from "../data/ReadingAndWritingTest.json";
import { getVoices, getDesiredVoice, speakText } from "@/utils/common";

export default function ReadingAndWriting() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userWriting, setUserWriting] = useState("");
  const [showCorrectWriting, setShowCorrectWriting] = useState(false);

  const currentItem = readingAndWritingTest[currentQuestionIndex];
  const readingSentence = currentItem?.reading || "No reading found.";
  const writingSentence = currentItem?.writing || "No writing found.";

  // On first access, or if voices haven't loaded yet, this may return an empty array
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakReading = () => {
    speakText(readingSentence, desiredVoice);
  };

  const speakWriting = () => {
    speakText(writingSentence, desiredVoice);
  };

  // Show correct writing
  const handleShowCorrect = () => setShowCorrectWriting(true);

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < readingAndWritingTest.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetState();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      resetState();
    }
  };

  const resetState = () => {
    setUserWriting("");
    setShowCorrectWriting(false);
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Reading &amp; Writing Practice</h1>
      </div>

      <div className="rounded bg-white p-6 shadow">
        {/* Heading / ID */}
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {currentItem?.id}
          </p>
        </div>

        {/* Reading Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Read the sentence</h2>
          <p className="mb-2 rounded bg-gray-100 p-2 text-gray-700">{readingSentence}</p>
          <button
            onClick={speakReading}
            className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
          >
            Read Aloud
          </button>
        </div>

        {/* Writing Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Write the sentence</h2>
          <button
            onClick={speakWriting}
            className="mr-4 rounded bg-green-600 px-4 py-2 font-bold text-white transition-colors hover:bg-green-500"
          >
            Hear Writing Sentence
          </button>
          <div className="mt-4">
            <textarea
              placeholder="Type the sentence here"
              value={userWriting}
              onChange={(e) => setUserWriting(e.target.value)}
              rows={3}
              className="w-full rounded border p-2 text-gray-700"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleShowCorrect}
              className="rounded bg-gray-600 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-500"
            >
              Show Correct Sentence
            </button>
          </div>
          {showCorrectWriting && (
            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Correct Sentence:</h3>
              <p className="rounded bg-gray-100 p-2 text-gray-700">{writingSentence}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`rounded px-4 py-2 font-bold text-white transition-colors ${
            currentQuestionIndex === 0
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentQuestionIndex === readingAndWritingTest.length - 1}
          className={`rounded px-4 py-2 font-bold text-white transition-colors ${
            currentQuestionIndex === readingAndWritingTest.length - 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
