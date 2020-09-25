const {
  app,
  BrowserWindow,
  Menu,
  Notification
} = require("electron");
const path = require("path");
const url = require("url");
const shell = require("electron").shell;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    //frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
    })
  );

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  var menu = Menu.buildFromTemplate([{
      label: "File",
      submenu: [{
          role: "Help",
          click() {
            shell.openExternal("https://www.aacle.org/find-a-meeting/");
          }
        },
        {
          //Adds separtor between labels in the menu bar
          type: "separator"
        },
        {
          label: "Quit SoberDaze",
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Tools To Keep The Peace",
      submenu: [{
          label: "Explore",
          click() {
            shell.openExternal("https://mix.com/");
          }
        },

        {
          label: "Read",
          click() {
            shell.openExternal("https://medium.com/");
          }
        },

        {
          label: "Study",
          click() {
            shell.openExternal("https://www.youtube.com/watch?v=hHW1oY26kxQ");
          }
        },

        {
          //Adds separtor between labels in the menu bar
          type: "separator"
        },

        {
          label: "Call Me By Your Name",
          click() {
            shell.openExternal(
              "https://wwv.123-movies.com/movie/call-me-by-your-name/watching.html"
            );
          }
        },
        {
          //Adds separtor between labels in the menu bar
          type: "separator"
        },
        {
          label: "Zzzzz",
          click() {
            shell.openExternal(
              "https://www.youtube.com/watch?v=wzjWIxXBs_s&t=3546s"
            );
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.