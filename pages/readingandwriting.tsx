"use client";

import React, { useState } from "react";
import readingAndWritingTest from "../data/ReadingAndWritingTest.json";
import { getVoices, getDesiredVoice, speakText, goToQuestion, shuffleArray } from "@/utils/common";
/// <reference types="react" />

export default function ReadingAndWriting() {
  const [questions, setQuestions] = useState(readingAndWritingTest);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userWriting, setUserWriting] = useState("");
  const [showCorrectWriting, setShowCorrectWriting] = useState(false);
  const [jumpNumber, setJumpNumber] = useState(""); 

  // Changed from readingAndWritingTest to questions
  const currentItem = questions[currentQuestionIndex];
  const readingSentence = currentItem?.reading || "No reading found.";
  const writingSentence = currentItem?.writing || "No writing found.";

  // Speech
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  const speakReading = () => speakText(readingSentence, desiredVoice);
  const speakWriting = () => speakText(writingSentence, desiredVoice);

  // Show correct writing
  const handleShowCorrect = () => setShowCorrectWriting(true);
  const resetView = () => setShowCorrectWriting(false);

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
      resetView();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev: number) => prev - 1);
      resetView();
    }
  };

  // Jump to a specific question number
  const handleJumpToQuestion = () => {
    const parsedNumber = parseInt(jumpNumber, 10);
    if (!isNaN(parsedNumber)) {
      const zeroBasedIndex = parsedNumber - 1;
      goToQuestion(zeroBasedIndex, questions.length, setCurrentQuestionIndex, resetView); // Changed to questions.length
    }
  };

  if (!currentItem) {
    return <div className="p-6 text-red-500">No questions available.</div>;
  }

  const shuffleQuestions = () => {
    const shuffled = shuffleArray(questions);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    resetView();
  };  

  return (
    <div className="mx-auto max-w-2xl py-8">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Reading &amp; Writing Practice</h1>
      </div>

      {/* Question Box */}
      <div className="rounded bg-white p-6 shadow">
        {/* Question Info */}
        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {currentItem.id}
          </p>
        </div>

        {/* Reading Section */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">Read the sentence</h2>
          <p className="mb-2 rounded bg-gray-100 p-2 text-gray-700">{readingSentence}</p>
          {/* Buttons side by side */}
          <div className="flex flex-wrap items-center gap-4 mt-2 mb-2 justify-center sm:justify-start">
            <button
              onClick={speakReading}
              className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Read Aloud
            </button>
          </div>
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
              <button
                onClick={speakWriting}
                className="mt-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
              >
                Read Answer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="mx-auto max-w-2xl flex justify-between items-center">
          {/* Previous / Next Buttons */}
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
              max={readingAndWritingTest.length}
              value={jumpNumber}
              onChange={(e) => setJumpNumber(e.target.value)}
              placeholder={`1 - ${readingAndWritingTest.length}`}
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
      
      {/* Add bottom padding to prevent content from being hidden behind fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
