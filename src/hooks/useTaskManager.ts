import { useState } from 'react';
import { Task } from '../types/timer';

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      },
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}