const { app, BrowserWindow } = require('electron');

// Disable GPU acceleration
app.disableHardwareAcceleration();

// Disable error dialogs
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('ignore-gpu-blacklist');

function createWindow() {
  const win = new BrowserWindow({
    width: 280,      // match TFT width
    height: 320,     // match TFT height
    resizable: false, // optional, prevent resizing
    fullscreen: false,
    autoHideMenuBar: true, // Hide the menu bar
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false // Disable DevTools
    }
  });

  win.loadURL('http://localhost:3000'); // or your React build folder
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});