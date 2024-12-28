import { useCallback } from 'react';
import { TimerMode } from '../types/timer';

export function useNotifications() {
  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      await Notification.requestPermission();
    }
  }, []);

  const showNotification = useCallback((mode: TimerMode) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = mode === 'pomodoro' 
        ? 'Time to take a break!' 
        : 'Break is over, time to focus!';
      
      new Notification(title, {
        icon: '/timer-icon.png',
        body: mode === 'pomodoro' 
          ? "Great job! You've completed a pomodoro session." 
          : "Break time is over. Let's get back to work!",
      });
    }
  }, []);

  return { requestPermission, showNotification };
}