"use client";

import React, { useState } from "react";
import meaningTest from "../data/MeaningTest.json";
import { getVoices, getDesiredVoice, speakText, goToQuestion } from "@/utils/common";
/// <reference types="react" />

export default function MeaningTest() {
  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [jumpNumber, setJumpNumber] = useState(""); // For user's input in the "Go" box

  const currentItem = meaningTest[currentIndex];
  const word = currentItem?.word || "Unknown";
  const meaning = currentItem?.meaning || "No meaning found.";
  const questionText = `Can you explain what "${word}" means?`;

  // Speech setup
  const voices = getVoices(); // may be empty until voices load
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakQuestion = () => speakText(questionText, desiredVoice);
  const speakAnswer = () => speakText(meaning, desiredVoice);

  // Show/hide answer
  const handleShowAnswer = () => setShowAnswer(true);
  const resetView = () => setShowAnswer(false);

  // Navigation
  const nextItem = () => {
    if (currentIndex < meaningTest.length - 1) {
      setCurrentIndex((prev: number) => prev + 1);
      resetView();
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev: number) => prev - 1);
      resetView();
    }
  };

  // Jump to a specific question number
  const handleJumpToQuestion = () => {
    const parsedNumber = parseInt(jumpNumber, 10);
    if (!isNaN(parsedNumber)) {
      // Convert user's 1-based input to 0-based index
      const zeroBasedIndex = parsedNumber - 1;
      goToQuestion(zeroBasedIndex, meaningTest.length, setCurrentIndex, resetView);
    }
  };

  if (!currentItem) {
    return <div className="p-6 text-red-500">No data found.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Meaning Practice</h1>
      </div>

      {/* Question Box */}
      <div className="rounded bg-white p-6 shadow">
        {/* Question Info */}
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {currentItem?.id}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-xl font-semibold text-gray-800">{questionText}</p>

          {/* Buttons side by side */}
          <div className="flex flex-wrap items-center gap-4 mt-2 mb-2 justify-center sm:justify-start">
            <button
              onClick={speakQuestion}
              className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Read Question
            </button>
            <button
              onClick={handleShowAnswer}
              className="rounded bg-gray-600 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-500"
            >
              Show Possible Answer
            </button>
          </div>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="mx-auto max-w-2xl flex justify-between items-center">
          {/* Prev / Next */}
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
          
          {/* Jump-to-question area */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={meaningTest.length}
              value={jumpNumber}
              onChange={(e) => setJumpNumber(e.target.value)}
              placeholder={`1 - ${meaningTest.length}`}
              className="w-16 rounded border p-2 text-gray-700"
            />
            <button
              onClick={handleJumpToQuestion}
              className="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors hover:bg-indigo-500"
            >
              Go
            </button>
          </div>
          
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
      
      {/* Add bottom padding to prevent content from being hidden behind fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
