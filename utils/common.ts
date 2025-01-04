// utils/common.ts

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
  // Attempt to find a voice matching both lang and "google"
  const googleVoice = voices.find(
    (v) => v.lang === lang && v.name.toLowerCase().includes(nameKeyword)
  );
  
  if (googleVoice) return googleVoice;
  
  // If no "google" voice is found, just pick the first matching language
  const fallbackVoice = voices.find((v) => v.lang === lang);
  return fallbackVoice;
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
