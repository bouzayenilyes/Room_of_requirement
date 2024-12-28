import React, { useState } from 'react';
import { Plus, Check, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Task } from '../types/timer';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onAddTask, onToggleTask, onDeleteTask }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      title: newTaskTitle,
      estimatedPomodoros,
      completedPomodoros: 0,
      isCompleted: false,
    });
    setNewTaskTitle('');
    setEstimatedPomodoros(1);
  };

  const adjustEstimatedPomodoros = (increment: boolean) => {
    setEstimatedPomodoros((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newValue, 10));
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What are you working on?"
          className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-white/80">Est. Pomodoros:</span>
            <button
              type="button"
              onClick={() => adjustEstimatedPomodoros(false)}
              className="text-white/60 hover:text-white"
            >
              <ChevronDown size={20} />
            </button>
            <span className="text-white font-medium w-6 text-center">{estimatedPomodoros}</span>
            <button
              type="button"
              onClick={() => adjustEstimatedPomodoros(true)}
              className="text-white/60 hover:text-white"
            >
              <ChevronUp size={20} />
            </button>
          </div>
          <button
            type="submit"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </form>

      <div className="space-y-2 mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-white/5 p-4 rounded-lg group hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${
                    task.isCompleted
                      ? 'bg-green-500 border-green-500'
                      : 'border-white/30 hover:border-white'
                  }`}
              >
                {task.isCompleted && <Check size={16} className="text-white" />}
              </button>
              <span
                className={`text-white ${
                  task.isCompleted ? 'line-through text-white/50' : ''
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-white/50">
                {task.completedPomodoros}/{task.estimatedPomodoros}
              </span>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}