import { toast } from 'react-hot-toast';
import { TimerMode } from '../types/timer';

export const showToast = (mode: TimerMode, completed: boolean = true) => {
  const messages = {
    pomodoro: {
      complete: '🎉 Focus session completed! Time for a break!',
      start: '🎯 Focus session started. Stay concentrated!',
    },
    shortBreak: {
      complete: '⏰ Break time is over! Ready to focus again?',
      start: '☕ Short break started. Take it easy!',
    },
    longBreak: {
      complete: '⏰ Long break finished! Let\'s get back to work!',
      start: '🌟 Long break started. Time to recharge!',
    },
  };

  const message = completed ? messages[mode].complete : messages[mode].start;
  
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#fff',
      color: '#333',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    icon: completed ? '✅' : '▶️',
  });
};