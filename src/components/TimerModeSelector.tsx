import React from 'react';
import { Timer as TimerIcon, Coffee, Moon, Settings as SettingsIcon } from 'lucide-react';
import { TimerMode } from '../types/timer';

interface TimerModeSelectorProps {
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  onSettingsClick: () => void;
}

export function TimerModeSelector({ mode, onModeChange, onSettingsClick }: TimerModeSelectorProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-lg">
        <div className="flex space-x-1">
          <button
            onClick={() => onModeChange('pomodoro')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
              ${mode === 'pomodoro' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <TimerIcon size={18} className="text-white" />
            <span className="text-white font-medium">Focus</span>
          </button>
          <button
            onClick={() => onModeChange('shortBreak')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
              ${mode === 'shortBreak' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <Coffee size={18} className="text-white" />
            <span className="text-white font-medium">Short Break</span>
          </button>
          <button
            onClick={() => onModeChange('longBreak')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
              ${mode === 'longBreak' ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}`}
          >
            <Moon size={18} className="text-white" />
            <span className="text-white font-medium">Long Break</span>
          </button>
        </div>
      </div>
      
      <button
        onClick={onSettingsClick}
        className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105"
      >
        <SettingsIcon size={20} />
      </button>
    </div>
  );
}