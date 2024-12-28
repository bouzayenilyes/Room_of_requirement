
# Pomoroom

Pomoroom is a simple and effective Pomodoro Timer web application designed to help users stay focused and manage their time efficiently using the Pomodoro Technique. The app features work intervals and break periods with a fun confetti animation for celebrating completed Pomodoros!

## Features

- **Pomodoro Timer**: Start and stop your Pomodoro sessions with ease.
- **Customizable Durations**: Adjust work and break durations based on your preference.
- **Confetti Animation**: Celebrate each completed Pomodoro with a fun confetti animation.
- **Progress Tracker**: Track how many Pomodoros you've completed in a session.
- **Responsive Design**: Tailwind CSS ensures the app looks great on any device.

## Technologies Used

- **Frontend**: React.js
- **CSS**: Tailwind CSS
- **Animations**: Confetti Animate JS
- **Time Management**: JavaScript (React hooks for timer functionality)
- **State Management**: React's built-in `useState` and `useEffect`

## Installation

To run Pomoroom locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/bouzayenilyes/pomoroom.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pomoroom
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm start
   ```

   Your Pomoroom app should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

- **Start a Pomodoro Session**: Click the "Start" button to begin a 25-minute work interval.
- **Take a Break**: After completing a Pomodoro session, take a 5-minute break. The timer will automatically switch to break mode.
- **Celebrate with Confetti**: When you complete a Pomodoro session, enjoy a celebratory confetti animation to keep you motivated.
- **Track Your Progress**: View the number of completed Pomodoros on your dashboard.

## Customization

Pomoroom allows you to customize:

- Work and break durations (default: 25 minutes for work, 5 minutes for break).
- Visual style using Tailwind CSS (you can modify or extend the design).

Modify the settings in the application to suit your workflow.

## Contributing

We welcome contributions to Pomoroom! If you'd like to improve the app or add features, feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- The Pomodoro Technique, created by Francesco Cirillo
- [Confetti Animate JS](https://github.com/lambertot/animated-confetti) for the fun animation
- Tailwind CSS for easy-to-use utility-first styling
- React.js for the dynamic user interface
