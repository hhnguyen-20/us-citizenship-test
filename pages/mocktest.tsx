"use client";

import React, { useState, useEffect } from "react";
// Data
import civicsData from "../data/CivicsTest.json";
import meaningData from "../data/MeaningTest.json";
import readingAndWritingData from "../data/ReadingAndWritingTest.json";
import yesNoData from "../data/YesNoTest.json";
// Utils
import { getVoices, getDesiredVoice, speakText, shuffleArray } from "@/utils/common";

/**
 * We'll unify all question types under a single shape.
 * For reading/writing, we'll store question = reading, answer = writing by default
 * But we STILL want a special layout for that type.
 */
type QuestionType = "civics" | "meaning" | "yesno" | "readingwriting";

interface MockQuestion {
  id: number;
  type: QuestionType;
  question: string; // Usually a single text. For reading/writing we'll do reading
  answer: string;   // For reading/writing, we'll do writing
}

/**
 * The main component
 */
export default function MockTest() {
  // All merged questions
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  // Current index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State for standard Q&A (show/hide answer)
  const [showAnswer, setShowAnswer] = useState(false);

  // Additional states for reading/writing format
  const [userWriting, setUserWriting] = useState("");
  const [showCorrectWriting, setShowCorrectWriting] = useState(false);

  // On first access, or if voices haven't loaded yet, this may return an empty array
  const voices = getVoices();
  const desiredVoice = getDesiredVoice(voices, "en-US", "google");

  // On mount, slice & shuffle data
  useEffect(() => {
    const civicsSubset = civicsData.slice(0, 10).map((item: any) => ({
      id: item.id,
      type: "civics" as const,
      question: item.question,
      answer: item.answer,
    }));

    const meaningSubset = meaningData.slice(0, 5).map((item: any) => ({
      id: item.id,
      type: "meaning" as const,
      question: `Can you explain what "${item.word}" means?`,
      answer: item.meaning,
    }));

    // We'll take 1 reading/writing item: question = reading, answer = writing
    const readingWritingSubset = readingAndWritingData.slice(0, 1).map((item: any) => ({
      id: item.id,
      type: "readingwriting" as const,
      question: item.reading,   // The "reading" text
      answer: item.writing,     // The "writing" text
    }));

    const yesNoSubset = yesNoData.slice(0, 5).map((item: any) => ({
      id: item.id,
      type: "yesno" as const,
      question: item.question,
      answer: item.answer,
    }));

    // Merge & shuffle
    let combined = [
      ...civicsSubset,
      ...meaningSubset,
      ...readingWritingSubset,
      ...yesNoSubset,
    ];
    combined = shuffleArray(combined);

    setQuestions(combined);
  }, []);

  // Reset reading/writing state
  const resetReadingWriting = () => {
    setUserWriting("");
    setShowCorrectWriting(false);
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
      resetReadingWriting(); // reset if the next question is reading/writing or not
    }
  };

  // Go to previous question
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowAnswer(false);
      resetReadingWriting();
    }
  };

  // Show standard answer
  const handleShowAnswer = () => setShowAnswer(true);

  //** Reading/Writing-specific behaviors **//
  const handleShowCorrectWriting = () => setShowCorrectWriting(true);

  if (questions.length === 0) {
    return (
      <div className="p-6 text-gray-700">
        Loading your mock test...
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isReadingWriting = currentQ.type === "readingwriting";

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Mock Citizenship Test</h1>
        <p className="mt-2 text-sm text-gray-500">
          Question {currentIndex + 1} of {questions.length} &bull; <span className="uppercase">{currentQ.type}</span>
        </p>
      </div>

      {/* If type is "readingwriting", we display that special format. Otherwise, standard Q&A. */}
      {isReadingWriting ? (
        <div className="rounded bg-white p-6 shadow">
          {/* Reading & Writing Format */}
          <div className="mb-4">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Question #:</span> {currentQ.id}
            </p>
          </div>

          {/* Reading Section */}
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Read the sentence</h2>
            <p className="mb-2 rounded bg-gray-100 p-2 text-gray-700">{currentQ.question}</p>
            <button
              onClick={() => speakText(currentQ.question, desiredVoice)}
              className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Read Aloud
            </button>
          </div>

          {/* Writing Section */}
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Write the sentence</h2>
            <button
              onClick={() => speakText(currentQ.answer, desiredVoice)}
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
                onClick={handleShowCorrectWriting}
                className="rounded bg-gray-600 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-500"
              >
                Show Correct Sentence
              </button>
            </div>
            {showCorrectWriting && (
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Correct Sentence:</h3>
                <p className="rounded bg-gray-100 p-2 text-gray-700">{currentQ.answer}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Standard Q&A Format (civics, meaning, yesno) */
        <div className="rounded bg-white p-6 shadow">
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold">Question #:</span> {currentQ.id}
          </p>
          <p className="mb-4 text-xl font-semibold text-gray-800">
            {currentQ.question}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => speakText(currentQ.question, desiredVoice)}
              className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
            >
              Read Question
            </button>
            <button
              onClick={handleShowAnswer}
              className="rounded bg-gray-600 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-500"
            >
              Show Answer
            </button>
          </div>

          {showAnswer && (
            <div className="mt-4 border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800">Answer:</h2>
              <p className="mt-2 rounded bg-gray-100 p-2 text-gray-700">{currentQ.answer}</p>

              <button
                onClick={() => speakText(currentQ.answer, desiredVoice)}
                className="mt-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500"
              >
                Read Answer
              </button>
            </div>
          )}
        </div>
      )}

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
          disabled={currentIndex === questions.length - 1}
          className={`rounded px-4 py-2 font-bold text-white transition-colors ${
            currentIndex === questions.length - 1
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
