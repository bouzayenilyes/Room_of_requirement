import React from 'react';
import { Clock } from 'lucide-react';
import { TimerMode } from '../types/timer';

interface TimeCustomizerProps {
  mode: TimerMode;
  duration: number;
  onDurationChange: (duration: number) => void;
}

export function TimeCustomizer({ mode, duration, onDurationChange }: TimeCustomizerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 60) {
      onDurationChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
      <Clock size={18} className="text-white/80" />
      <input
        type="number"
        min="1"
        max="60"
        value={duration}
        onChange={handleChange}
        className="w-16 bg-transparent text-white border border-white/20 rounded px-2 py-1 text-center focus:outline-none focus:border-white/40"
      />
      <span className="text-white/80">minutes</span>
    </div>
  );
}