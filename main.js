const electron = require('electron')

const { app, BrowserWindow } = require('electron')
var path = require('path')

function createWindow () {
  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    icon:path.join(__dirname, '/clock.icns'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('connexion.html')
}

app.on('ready', createWindow)
