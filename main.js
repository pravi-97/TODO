import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconPath = path.join(__dirname, 'assets', 'app.ico');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    icon: iconPath,
    autoHideMenuBar: true,
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  // ✅ Add this block to enable Windows startup
  app.setLoginItemSettings({
    openAtLogin: true,
    path: process.execPath,
    args: []
  });
});
