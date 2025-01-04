"use client";

import React, { useState } from "react";
import yesNoTest from "../data/YesNoTest.json";
import { getVoices, getDesiredVoice, speakText } from "@/utils/common";

export default function YesNoPractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentItem = yesNoTest[currentIndex];
  const questionNumber = currentItem?.id || 0;
  const questionText = currentItem?.question || "No question found.";
  const possibleAnswer = currentItem?.answer || "No answer found.";

  // On first access, or if voices haven't loaded yet, this may return an empty array
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakQuestion = () => {
    speakText(questionText, desiredVoice);
  };

  const handleShowAnswer = () => setShowAnswer(true);
  const resetView = () => setShowAnswer(false);

  const nextQuestion = () => {
    if (currentIndex < yesNoTest.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetView();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetView();
    }
  };

  if (!currentItem) {
    return <div className="p-6 text-red-500">No data found.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Yes/No Practice</h1>
      </div>

      <div className="rounded bg-white p-6 shadow">
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {questionNumber}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-800">{questionText}</p>
          <button
            onClick={speakQuestion}
            className="mt-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
          >
            Read Question
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={handleShowAnswer}
            className="rounded bg-gray-600 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-500"
          >
            Show Possible Answer
          </button>
        </div>

        {showAnswer && (
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800">Possible Answer:</h2>
            <p className="mt-2 rounded bg-gray-100 p-2 text-gray-700">{possibleAnswer}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className={`rounded px-4 py-2 font-bold text-white transition-colors ${
            currentIndex === 0
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentIndex === yesNoTest.length - 1}
          className={`rounded px-4 py-2 font-bold text-white transition-colors ${
            currentIndex === yesNoTest.length - 1
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
