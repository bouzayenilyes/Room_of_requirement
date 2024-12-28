import React from 'react';
import { Settings as SettingsIcon, Volume2, BellRing, Play } from 'lucide-react';
import { TimerSettings } from '../types/timer';

interface SettingsProps {
  settings: TimerSettings;
  onSettingsChange: (settings: TimerSettings) => void;
}

export function Settings({ settings, onSettingsChange }: SettingsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <SettingsIcon size={20} />
        Timer Settings
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-white/80 font-medium">Time (minutes)</h3>
          <div className="grid grid-cols-3 gap-4">
            {['pomodoro', 'shortBreak', 'longBreak'].map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-sm text-white/60 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="number"
                  value={settings[key as keyof TimerSettings]}
                  onChange={(e) => 
                    onSettingsChange({
                      ...settings,
                      [key]: parseInt(e.target.value, 10)
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                  min={1}
                  max={60}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white/80 font-medium">Auto Start</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <Play size={16} />
                Auto-start Breaks
              </span>
              <input
                type="checkbox"
                checked={settings.autoStartBreaks}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    autoStartBreaks: e.target.checked
                  })
                }
                className="w-4 h-4"
              />
            </label>
            <label className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <Play size={16} />
                Auto-start Pomodoros
              </span>
              <input
                type="checkbox"
                checked={settings.autoStartPomodoros}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    autoStartPomodoros: e.target.checked
                  })
                }
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white/80 font-medium">Long Break Interval</h3>
          <input
            type="number"
            value={settings.longBreakInterval}
            onChange={(e) =>
              onSettingsChange({
                ...settings,
                longBreakInterval: parseInt(e.target.value, 10)
              })
            }
            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
            min={1}
            max={10}
          />
        </div>
      </div>
    </div>
  );
}