const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

let contents;
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false

    }
  })

  win.loadFile('src/index.html')
  contents = win.webContents
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('restart-app',(event,args) =>{
    app.quit()
    app.relaunch()
})

ipcMain.on('quit-app',(event,args) =>{
    app.exit()
})

ipcMain.on('open-folder',(event,args) =>{
  dialog.showOpenDialog({title: "Select Local Repository",properties:['openDirectory']})
  .then((data) => {
    console.log('The folder selected is', data)
    contents.send('folder-selected',data)
  })
  
})
