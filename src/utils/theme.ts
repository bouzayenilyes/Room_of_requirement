import { TimerMode } from '../types/timer';

export const getBackgroundColor = (mode: TimerMode): string => {
  switch (mode) {
    case 'shortBreak':
      return 'bg-gradient-to-br from-teal-500 to-teal-700';
    case 'longBreak':
      return 'bg-gradient-to-br from-blue-600 to-blue-800';
    default:
      return 'bg-gradient-to-br from-red-500 to-red-700';
  }
};