import React from 'react';
import { BarChart, Clock, Target } from 'lucide-react';
import { Task } from '../types/timer';

interface StatsProps {
  tasks: Task[];
  completedPomodoros: number;
}

export function Stats({ tasks, completedPomodoros }: StatsProps) {
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalEstimatedPomodoros = tasks.reduce((acc, task) => acc + task.estimatedPomodoros, 0);
  const focusTime = completedPomodoros * 25; // 25 minutes per pomodoro

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <BarChart size={20} />
        Today's Statistics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Clock size={16} />
            <span>Focus Time</span>
          </div>
          <p className="text-2xl font-bold text-white">{focusTime} min</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Target size={16} />
            <span>Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">{completedPomodoros}</p>
        </div>
      </div>

      <div className="mt-4 bg-white/5 rounded-lg p-4">
        <h3 className="text-white/80 font-medium mb-2">Tasks Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-white">
            <span>Completed Tasks</span>
            <span>{completedTasks}/{tasks.length}</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Estimated Pomodoros</span>
            <span>{completedPomodoros}/{totalEstimatedPomodoros}</span>
          </div>
        </div>
      </div>
    </div>
  );
}