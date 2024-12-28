import React, { useEffect } from 'react';
import { Play, Pause, RefreshCw, Bell } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import { TimerMode } from '../types/timer';
import { TimeAdjuster } from './TimeAdjuster';
import { useNotifications } from '../hooks/useNotifications';
import { useSound } from '../hooks/useSound';

interface TimerProps {
  mode: TimerMode;
  duration: number;
  onComplete: () => void;
  onDurationChange: (duration: number) => void;
}

export function Timer({ mode, duration, onComplete, onDurationChange }: TimerProps) {
  const { requestPermission, showNotification } = useNotifications();
  const { initializeSounds, playSound } = useSound();
  const { timeLeft, isRunning, start, pause, reset } = useTimer(
    duration,
    mode,
    onComplete,
    playSound,
    showNotification
  );

  useEffect(() => {
    initializeSounds();
    requestPermission();
  }, [initializeSounds, requestPermission]);

  useEffect(() => {
    reset();
  }, [duration, reset]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative group">
        <div className="text-9xl font-bold text-white font-mono tracking-wider filter drop-shadow-lg">
          {formattedTime}
        </div>
        {!isRunning && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <TimeAdjuster value={duration} onChange={onDurationChange} />
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={isRunning ? pause : start}
          className="bg-white/20 hover:bg-white/30 text-white px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-lg flex items-center space-x-3"
        >
          {isRunning ? (
            <>
              <Pause size={24} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={24} />
              <span>Start</span>
            </>
          )}
        </button>
        
        {!isRunning && (
          <>
            <button
              onClick={reset}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-lg"
              title="Reset Timer"
            >
              <RefreshCw size={24} />
            </button>
            <button
              onClick={requestPermission}
              className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-lg"
              title="Enable Notifications"
            >
              <Bell size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}