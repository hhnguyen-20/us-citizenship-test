"use client";

import React, { useState } from "react";
import CivicsTest from "../../data/CivicsTest.json";

type CivicsQuestion = {
  id: number;
  question: string;
  answer: string;
};

export default function Civics() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Current question details
  const currentQuestion: CivicsQuestion | undefined = CivicsTest[currentQuestionIndex];
  const questionId = currentQuestion?.id ?? 0;
  const questionText = currentQuestion?.question || "No question found.";
  const correctAnswer = currentQuestion?.answer || "No answer found.";

  // Speak question aloud
  const speakQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(questionText);
    window.speechSynthesis.speak(utterance);
  };

  // Speak answer aloud
  const speakAnswer = () => {
    const utterance = new SpeechSynthesisUtterance(correctAnswer);
    window.speechSynthesis.speak(utterance);
  };

  // Show answer
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  // Navigation
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < CivicsTest.length - 1) {
      setShowAnswer(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="p-6 text-red-500">
        No questions available.
      </div>
    );
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

        {/* Buttons Row */}
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
            <h2 className="text-lg font-semibold text-gray-800">Possible Correct Answer:</h2>
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
    </div>
  );
}
