import React, { useState, useCallback } from 'react';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { TimerModeSelector } from './components/TimerModeSelector';
import { Settings } from './components/Settings';
import { Stats } from './components/Stats';
import { TimerMode, TimerSettings } from './types/timer';
import { getBackgroundColor } from './utils/theme';
import { useTimerSettings } from './hooks/useTimerSettings';
import { useTaskManager } from './hooks/useTaskManager';
import { Toaster } from 'react-hot-toast';

export function App() {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const { settings, updateSettings } = useTimerSettings();
  const { tasks, addTask, toggleTask, deleteTask } = useTaskManager();
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const handleTimerComplete = useCallback(() => {
    if (mode === 'pomodoro') {
      setCompletedPomodoros((prev) => prev + 1);
      if (settings.autoStartBreaks) {
        setMode(completedPomodoros % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak');
      }
    } else if (settings.autoStartPomodoros) {
      setMode('pomodoro');
    }
  }, [mode, completedPomodoros, settings]);

  const getDuration = (currentMode: TimerMode): number => {
    switch (currentMode) {
      case 'shortBreak':
        return settings.shortBreak;
      case 'longBreak':
        return settings.longBreak;
      default:
        return settings.pomodoro;
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor(mode)} transition-colors duration-700`}>
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'text-sm sm:text-base',
          style: {
            maxWidth: '90vw',
          },
        }}
      />
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col items-center space-y-6 sm:space-y-12">
          <TimerModeSelector 
            mode={mode} 
            onModeChange={setMode}
            onSettingsClick={() => setShowSettings(!showSettings)} 
          />
          
          <Timer
            mode={mode}
            duration={getDuration(mode)}
            onComplete={handleTimerComplete}
            onDurationChange={(duration) => 
              updateSettings({ ...settings, [mode]: duration })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 w-full max-w-4xl">
            <div className="order-2 lg:order-1">
              <TaskList
                tasks={tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </div>
            
            <div className="space-y-4 sm:space-y-8 order-1 lg:order-2">
              <Stats 
                tasks={tasks}
                completedPomodoros={completedPomodoros}
              />
              
              {showSettings && (
                <Settings
                  settings={settings}
                  onSettingsChange={updateSettings}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;