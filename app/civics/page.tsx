"use client";

import "regenerator-runtime/runtime";
import { useState, useEffect } from "react";
import civicsQuestions from "../../data/civicsQuestions.json";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { generateContent } from "@/utils/genAI";

const Civics: React.FC = () => {
  const [answer, setAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isBrowserSupported, setIsBrowserSupported] = useState<boolean>(true);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const currentQuestion = civicsQuestions?.[currentQuestionIndex]?.question || "No question found";
  const correctAnswer = civicsQuestions?.[currentQuestionIndex]?.correctAnswer || "No answer found";

  // const [aiResponse, setAiResponse] = useState<string>("");

  useEffect(() => {
    // Check browser support for speech recognition
    if (typeof window !== 'undefined') {
      setIsBrowserSupported(SpeechRecognition.browserSupportsSpeechRecognition());
    }

    // Reset input and state when the question changes
    setAnswer("");
    setSubmitted(false);
    resetTranscript();
  }, [currentQuestionIndex]);

  const handleInput = () => {
    const input = transcript || answer;
    if (!input) return;

    setSubmitted(true);

    // const response = await generateContent(
    //   `Compare the user's answer: "${input}" with the correct answer: "${civicsQuestions[currentQuestionIndex].correctAnswer}". If incorrect, return the possible correct answers. No need to explain.`
    // );
    //
    // setAiResponse(response);

    resetTranscript();
  };

  const speakQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(currentQuestion);
    window.speechSynthesis.speak(utterance);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < civicsQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!isBrowserSupported) {
    return (
      <div className="p-6">
        <p className="text-red-500">Your browser does not support speech recognition.</p>
      </div>
    );
  }

  return (
      <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Civics Questions</h1>
          <div className="mb-4">
              <p className="text-lg font-semibold mb-2">
                  {currentQuestion}
              </p>
              <button
                  onClick={speakQuestion}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                  Read Question
              </button>
          </div>
          <div className="mb-4">
              <input
                  type="text"
                  placeholder="Type your answer here"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="border rounded p-2 w-full"
              />
          </div>
          <div className="flex justify-center mb-4">
              <button
                  onClick={() => SpeechRecognition.startListening({continuous: true})}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                  Speak Answer
              </button>
              <button
                  onClick={handleInput}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4"
              >
                  Submit
              </button>
              <button
                  onClick={() => resetTranscript()}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4"
              >
                  Reset
              </button>
          </div>
          <div className="mt-6">
              <h2 className="text-lg font-semibold">Spoken/Text Input:</h2>
              <p className="bg-gray-100 p-2 rounded">{transcript || answer || "No input yet"}</p>
              {submitted && (
                  <>
                    <h2 className="text-lg font-semibold mt-4">Possible Correct Answer:</h2>
                    <p className="bg-gray-100 p-2 rounded">{correctAnswer}</p>
                  </>
              )}
              {/*<h2 className="text-lg font-semibold mt-4">AI Feedback:</h2>*/}
              {/*<p className="bg-gray-100 p-2 rounded">{aiResponse || "No feedback yet"}</p>*/}
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`${
                  currentQuestionIndex === 0
                      ? "bg-gray-300 text-gray-700"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
              } font-bold py-2 px-4 rounded`}
            >
              Previous
            </button>
            <button
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === civicsQuestions.length - 1}
              className={`${
                  currentQuestionIndex === civicsQuestions.length - 1
                      ? "bg-gray-300 text-gray-700"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
              } font-bold py-2 px-4 rounded`}
            >
              Next
            </button>
          </div>
      </div>
  );
};

export default Civics;
