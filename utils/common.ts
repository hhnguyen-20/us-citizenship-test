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
  // This function itself doesn't need a window check if 'voices' is always from the client
  return voices.find(
    (voice) => voice.lang === lang && voice.name.toLowerCase().includes(nameKeyword)
  );
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
