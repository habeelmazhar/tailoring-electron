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

    db.findOne({ s_no: parseInt(user_id) }, function (err, data) {
        for (var key in data) {
            console.log('typeof data[key]: ', typeof data[key]);
            let selector = key;
            if (typeof data[key] == 'object') {
                let obj = data[key];
                for (var key in obj)
                    $('#' + selector + ' input[name="' + key + '"]').val(obj[key]);
            }
            // else
            //     $('#data_container').append('<p>' + data[key] + '</p>');
        }
    });

    $(function () {
        M.updateTextFields();
    });
}

$(document).ready(function () {
    console.log("ready!");
    loadData();
});

$('#btn_add').click(function () {

    let data = {};
    let obj = {};
    $("#user .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.user = obj;
    obj = {};

    $("#shalwar_kameez .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.shalwar_kameez = obj;
    obj = {};

    $("#waist_coat .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.waist_coat = obj;
    obj = {};

    $("#shirt .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.shirt = obj;
    obj = {};

    $("#pant .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.pant = obj;
    obj = {};

    var user_id = GetURLParameter("user_id");
    data.s_no = parseInt(user_id);
    db.update({ s_no: parseInt(user_id) }, data, {}, function (err, doc) {
        console.log(data)
        M.toast({ html: 'Successfully updated' });
        setTimeout(() => {
            var window = remote.getCurrentWindow();
            window.close();
        }, 3000)
    });

});
