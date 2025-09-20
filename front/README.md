# Electron + Vite + React Application

A desktop application built with Electron, Vite, and React. The application window is configured to be 280x320 pixels with a fixed size.

## Features

- Built with Electron for desktop functionality
- React + Vite for fast development and building
- Fixed window size (280x320)
- Disabled menu bar and dev tools for clean UI
- Hardware acceleration disabled for better compatibility

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ramjirv32/MED-AI.git
cd front
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode, you need to:

1. Start the Vite development server:
```bash
npm run dev
```

2. In a separate terminal, start Electron:
```bash
npm start
```

## Build

To build the application:

```bash
npm run build
```

## Scripts

- `npm run dev` - Start Vite development server
- `npm start` - Launch Electron app
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
front/
├── src/               # Source files
│   ├── App.jsx       # Main React component
│   ├── main.jsx      # React entry point
│   └── assets/       # Static assets
├── main.cjs          # Electron main process
├── vite.config.js    # Vite configuration
└── package.json      # Project configuration
```

## Configuration

- Electron window size: 280x320 pixels (fixed)
- Development server port: 3000
- Menu bar: Hidden
- DevTools: Disabled
- Hardware acceleration: Disabled for better compatibility

## License

[MIT](LICENSE)
