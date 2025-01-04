"use client";

import React, { useState } from "react";
import CivicsTest from "@/data/CivicsTest.json";
// Import the helper if you want a single function that sets the index safely
import { getVoices, getDesiredVoice, speakText, goToQuestion } from "@/utils/common";

export default function Civics() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [jumpNumber, setJumpNumber] = useState(""); // <-- NEW: for user input

  const currentQuestion = CivicsTest[currentQuestionIndex];
  const questionId = currentQuestion?.id ?? 0;
  const questionText = currentQuestion?.question ?? "No question found.";
  const correctAnswer = currentQuestion?.answer ?? "No answer found.";

  // Speech
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakQuestion = () => speakText(questionText, desiredVoice);
  const speakAnswer = () => speakText(correctAnswer, desiredVoice);

  // Show answer
  const handleShowAnswer = () => setShowAnswer(true);
  const resetView = () => setShowAnswer(false);

  // Navigation
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      resetView();
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < CivicsTest.length - 1) {
      resetView();
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Jump to a specific question number (based on array index)
  const handleJumpToQuestion = () => {
    const parsedNumber = parseInt(jumpNumber, 10);
    if (!isNaN(parsedNumber)) {
      // Convert user’s 1-based input to zero-based index
      const zeroBasedIndex = parsedNumber - 1;
      goToQuestion(zeroBasedIndex, CivicsTest.length, setCurrentQuestionIndex, resetView);
    }
  };

  if (!currentQuestion) {
    return <div className="p-6 text-red-500">No questions available.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Civics Practice</h1>
      </div>

      <div className="rounded bg-white p-6 shadow">
        {/* Question Info */}
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {questionId}
          </p>
          <p className="mt-2 text-xl font-semibold text-gray-800">
            {questionText}
          </p>
        </div>

        {/* Buttons Row (Side by Side) */}
        <div className="flex flex-wrap items-center gap-4">
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

        {/* Show Answer */}
        {showAnswer && (
          <div className="mt-4 border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Possible Correct Answer:
            </h2>
            <p className="mt-2 rounded bg-gray-100 p-2 text-gray-700">
              {correctAnswer}
            </p>
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
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        {/* Prev / Next Buttons */}
        <div className="flex gap-2">
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
            disabled={currentQuestionIndex === CivicsTest.length - 1}
            className={`rounded px-4 py-2 font-bold text-white transition-colors ${
              currentQuestionIndex === CivicsTest.length - 1
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            Next
          </button>
        </div>

        {/* Jump-to-question area */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={CivicsTest.length}
            value={jumpNumber}
            onChange={(e) => setJumpNumber(e.target.value)}
            placeholder={`1 - ${CivicsTest.length}`}
            className="w-16 rounded border p-2 text-gray-700"
          />
          <button
            onClick={handleJumpToQuestion}
            className="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors hover:bg-indigo-500"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
