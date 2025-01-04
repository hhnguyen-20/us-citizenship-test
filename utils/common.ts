// utils/common.ts

import React from "react";

export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined") {
    // Return an empty array when on the server
    return [];
  }
  return window.speechSynthesis.getVoices();
}

export function getDesiredVoice(
  voices: SpeechSynthesisVoice[],
  lang = "en-US",
  nameKeyword = "google"
): SpeechSynthesisVoice | undefined {
  // 1) Attempt to find a "Google" voice in en-US
  const googleVoice = voices.find(
    (voice) => voice.lang === lang && voice.name.toLowerCase().includes(nameKeyword)
  );
  if (googleVoice) {
    return googleVoice;
  }

  // 2) If no Google voice is found, try "Samantha" for Safari
  // (since iOS/Mac Safari typically includes a voice named "Samantha" for en-US)
  const safariVoice = voices.find(
    (voice) => voice.lang === lang && voice.name.toLowerCase().includes("samantha")
  );
  if (safariVoice) {
    return safariVoice;
  }

  // 3) Otherwise, just pick the first en-US voice found
  return voices.find((voice) => voice.lang === lang);
}

export function speakText(text: string, voice?: SpeechSynthesisVoice) {
  // Also guard here
  if (typeof window === "undefined") return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function goToQuestion(
  questionIndex: number,
  totalQuestions: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  resetView: () => void
) {
  // Ensure questionIndex is within valid range
  if (questionIndex < 0) questionIndex = 0;
  if (questionIndex >= totalQuestions) questionIndex = totalQuestions - 1;

  // Update the state
  setIndex(questionIndex);

  // Reset any "show/hide answer" or other UI states
  resetView();
}
