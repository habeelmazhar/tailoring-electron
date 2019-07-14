
const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const remote = electron.remote

const db = remote.getGlobal("db");

$('#btn_add').click(function () {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        // frame: false,
        alwaysOnTop: true,
        width: 800, height: 600,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    win.setMenuBarVisibility(false)

    win.on('closed', function () { win = null; loadData() })
    win.loadURL(modalPath)
    // win.webContents.openDevTools()

    win.show()
})


function loadData() {
    $('#data_container').empty();

    db.find({}).sort({ s_no: 1 }).exec(function (err, docs) {
        docs.forEach(function (d) {
            let temp = `<tr class="viewUser">
            <td>${d.s_no}</td>
            <td>${d.user.Name}</td>
            <td>${d.user.Phone}</td>
            <td>${d.user.Address}</td>
          </tr>`
            $('#data_container').append(temp);
        });

        $('.viewUser').click(showUser);
    });
}

$(document).ready(function () {
    console.log("ready!");
    loadData();
});


function showUser() {
    let user_id = $(this).find('td:first').html();
    const modalPath = path.join('file://', __dirname, 'show.html?user_id=' + user_id)

    let win = new BrowserWindow({
        // alwaysOnTop: true,
        width: 800, height: 600,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    win.setMenuBarVisibility(false)

    win.on('closed', function () { win = null; loadData() })
    win.loadURL(modalPath)
    // win.webContents.openDevTools()

    win.show()
}