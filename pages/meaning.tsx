"use client";

import React, { useState } from "react";
import meaningTest from "../data/MeaningTest.json";
import { getVoices, getDesiredVoice, speakText } from "@/utils/common";

export default function MeaningTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentItem = meaningTest[currentIndex];
  const word = currentItem?.word || "Unknown";
  const meaning = currentItem?.meaning || "No meaning found.";
  const questionText = `Can you explain what "${word}" means?`;

  // On first access, or if voices haven't loaded yet, this may return an empty array
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakQuestion = () => {
    speakText(questionText, desiredVoice);
  };

  const speakAnswer = () => {
    speakText(meaning, desiredVoice);
  };

  // Show the meaning
  const handleShowAnswer = () => setShowAnswer(true);
  const resetView = () => setShowAnswer(false);

  const nextItem = () => {
    if (currentIndex < meaningTest.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetView();
    }
  };

  const prevItem = () => {
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
        <h1 className="text-3xl font-bold text-gray-800">Meaning Practice</h1>
      </div>

      <div className="rounded bg-white p-6 shadow">
        {/* Heading / ID */}
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {currentItem?.id}
          </p>
        </div>

        {/* Question */}
        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-800">{questionText}</p>
          <button
            onClick={speakQuestion}
            className="mt-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
          >
            Read Question
          </button>
        </div>

        {/* Show Answer */}
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
            <p className="mt-2 rounded bg-gray-100 p-2 text-gray-700">{meaning}</p>

            <button
              onClick={speakAnswer}
              className="mt-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Read Answer
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevItem}
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
          onClick={nextItem}
          disabled={currentIndex === meaningTest.length - 1}
          className={`rounded px-4 py-2 font-bold text-white transition-colors ${
            currentIndex === meaningTest.length - 1
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
