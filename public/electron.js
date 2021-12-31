const electron = require('electron');
const { autoUpdater } = require("electron-updater")
const package = require('../package');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const menu = electron.Menu;
menu.setApplicationMenu(menu.buildFromTemplate([
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Submit feedback...',
        click: function () {
          electron.shell.openExternal(package.bugs.url);
        }
      },
      {
        role: 'about',
      },
    ]
  }
]));
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  const { globalShortcut } = require('electron');
  mainWindow = new BrowserWindow({ width: 1024, height: 768 });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.setAutoHideMenuBar(true);
  // 在开发环境和生产环境均可通过快捷键打开devTools
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    mainWindow.webContents.openDevTools()
  })
  autoUpdater.checkForUpdatesAndNotify();
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
