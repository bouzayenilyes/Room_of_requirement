import { useState, useEffect, useCallback } from 'react';
import { TimerMode } from '../types/timer';
import { showToast } from '../utils/notifications';
import { triggerConfetti } from '../utils/confetti';

export function useTimer(
  initialTime: number, 
  mode: TimerMode,
  onComplete: () => void,
  playSound: (sound: string) => void,
  showNotification: (mode: TimerMode) => void
) {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
    showToast(mode, false);
  }, [mode]);

  const pause = useCallback(() => setIsRunning(false), []);
  
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(initialTime * 60);
  }, [initialTime]);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            showNotification(mode);
            playSound('complete');
            showToast(mode, true);
            if (mode === 'pomodoro') {
              triggerConfetti();
            }
            onComplete();
            return 0;
          }
          if (time <= 4) {
            playSound('tick');
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete, mode, playSound, showNotification]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}