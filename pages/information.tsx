"use client";

import React, { useState } from "react";
import InformationTest from "@/data/InformationTest.json";
// Import goToQuestion if it's in common
import { getVoices, getDesiredVoice, speakText, goToQuestion } from "@/utils/common";
/// <reference types="react" />

export default function Information() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [jumpNumber, setJumpNumber] = useState(""); // <-- NEW: for user input

  const currentQuestion = InformationTest[currentQuestionIndex];
  const questionId = currentQuestion?.id ?? 0;
  const questionText = currentQuestion?.question ?? "No question found.";
  const correctAnswer = currentQuestion?.answer ?? "No answer found.";

  // Speech
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakQuestion = () => speakText(questionText, desiredVoice);
  const speakAnswer = () => speakText(correctAnswer, desiredVoice);

  // Show/hide answer
  const handleShowAnswer = () => setShowAnswer(true);
  const resetView = () => setShowAnswer(false);

  // Navigation
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      resetView();
      setCurrentQuestionIndex((prev: number) => prev - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < InformationTest.length - 1) {
      resetView();
      setCurrentQuestionIndex((prev: number) => prev + 1);
    }
  };

  // Jump to a specific question number
  const handleJumpToQuestion = () => {
    const parsedNumber = parseInt(jumpNumber, 10);
    if (!isNaN(parsedNumber)) {
      // Convert user's 1-based input to zero-based index
      const zeroBasedIndex = parsedNumber - 1;
      goToQuestion(zeroBasedIndex, InformationTest.length, setCurrentQuestionIndex, resetView);
    }
  };

  if (!currentQuestion) {
    return <div className="p-6 text-red-500">No questions available.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Information Practice</h1>
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

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-4 mb-4 justify-center sm:justify-start">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="mx-auto max-w-2xl flex justify-between items-center">
          {/* Prev / Next Buttons */}
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
          
          {/* Jump-to-question area */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={InformationTest.length}
              value={jumpNumber}
              onChange={(e) => setJumpNumber(e.target.value)}
              placeholder={`1 - ${InformationTest.length}`}
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
            onClick={nextQuestion}
            disabled={currentQuestionIndex === InformationTest.length - 1}
            className={`rounded px-4 py-2 font-bold text-white transition-colors ${
              currentQuestionIndex === InformationTest.length - 1
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
