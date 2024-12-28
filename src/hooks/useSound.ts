import { useCallback, useRef } from 'react';

const SOUNDS = {
  complete: '/sounds/complete.mp3',
  tick: '/sounds/tick.mp3',
} as const;

type SoundMap = Record<keyof typeof SOUNDS, HTMLAudioElement | undefined>;

export function useSound() {
  const audioRef = useRef<SoundMap>({
    complete: undefined,
    tick: undefined
  });

  const initializeSounds = useCallback(() => {
    (Object.entries(SOUNDS) as [keyof typeof SOUNDS, string][]).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioRef.current[key] = audio;
    });
  }, []);

  const playSound = useCallback((sound: keyof typeof SOUNDS) => {
    const audio = audioRef.current[sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, []);

  return { initializeSounds, playSound };
}