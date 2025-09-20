# Watch Interface - React Conversion

This project is a React conversion of the original HTML watch interface. It maintains the exact same design and functionality while using modern React patterns.

## Features

- **Main Watch Widget**: Displays time, date, battery status, weather, and calendar
- **Chat Interface**: Voice and text messaging capabilities
- **Weather Panel**: Real-time weather information with city search
- **Calendar Panel**: Event management with date picker
- **Battery Panel**: Battery status and usage history

## Components

- `WatchWidget.jsx` - Main watch interface
- `ChatInterface.jsx` - Chat functionality with voice recording
- `WeatherPanel.jsx` - Weather information and search
- `CalendarPanel.jsx` - Calendar and event management
- `BatteryPanel.jsx` - Battery status and history

## Technologies Used

- React 19.1.1
- React Router DOM for navigation
- Tailwind CSS for styling
- Font Awesome for icons
- Web APIs for battery, weather, and speech recognition

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Navigation

- Main watch interface: `/`
- Chat interface: `/chat`

## API Keys

The weather functionality requires an OpenWeatherMap API key. Update the `API_KEY` constant in `WeatherPanel.jsx` with your own key.

## Browser Compatibility

- Modern browsers with support for:
  - Web APIs (Battery API, Speech Recognition, MediaRecorder)
  - CSS Grid and Flexbox
  - ES6+ JavaScript features