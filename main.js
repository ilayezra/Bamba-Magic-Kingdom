// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let server;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // טוען את האתר מתוך שרת express
  win.loadURL('http://localhost:3000/index.html');
}

app.whenReady().then(() => {
  // יצירת אפליקציית express שמגישה את תיקיית src
  const expressApp = express();
  expressApp.use(express.static(path.join(__dirname, 'src')));

  server = expressApp.listen(3000, () => {
    console.log('Local server running at http://localhost:3000');
    createWindow();
  });
});

app.on('window-all-closed', () => {
  if (server) server.close();
  if (process.platform !== 'darwin') app.quit();
});
