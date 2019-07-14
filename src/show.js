const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const remote = electron.remote

const db = remote.getGlobal("db");



$('#btn_close').click(function () {
    var window = remote.getCurrentWindow();
    window.close();
});


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function loadData() {
    var user_id = GetURLParameter("user_id");
    console.log('user_id: ', user_id);
    $('#data_container').empty()

    db.findOne({ s_no: parseInt(user_id) }, function (err, data) {
        for (var key in data) {
            console.log('typeof data[key]: ', typeof data[key]);

            if (typeof data[key] == 'object') {
                $('#data_container').append('<h5>' + key + " : " + '</h5>');
                let obj = data[key];
                for (var key in obj)
                    $('#data_container').append('<p><b>' + key + "</b> : " + obj[key] + '</p>');
            }
            // else
            // $('#data_container').append('<p>' + data[key] + '</p>');
        }
    });
}

$(document).ready(function () {
    loadData()
});


$('#btn_delete').click(function () {
    var user_id = GetURLParameter("user_id");

    db.remove({ s_no: parseInt(user_id) }, {}, function (err, numRemoved) {
        M.toast({ html: 'Successfully deleted' });
        setTimeout(() => {
            var window = remote.getCurrentWindow();
            window.close();
        }, 3000)
    });

});



$('#btn_edit').click(function () {
    var user_id = GetURLParameter("user_id");

    const modalPath = path.join('file://', __dirname, 'edit.html?user_id=' + user_id)
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