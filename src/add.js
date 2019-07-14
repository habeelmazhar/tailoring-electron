const electron = require('electron')
const remote = electron.remote

const db = remote.getGlobal("db");

$('#btn_close').click(function () {
    var window = remote.getCurrentWindow();
    window.close();
});

$('#btn_add').click(function () {

    let data = {};
    let obj = {};
    $("#userInputFields .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.user = obj;
    obj = {};

    $("#shalwarKameezInputFields .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.shalwar_kameez = obj;
    obj = {};

    $("#waistCoatInputFields .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.waist_coat = obj;
    obj = {};

    $("#shirtInputFields .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.shirt = obj;
    obj = {};

    $("#pantInputFields .getdata").each(function (i) {
        let key = $(this).siblings('label').html();
        obj[key] = $(this).val();
    })
    data.pant = obj;
    obj = {};

    db.findOne({}).sort({ s_no: -1 }).exec(function (err, doc) {
        let s_no = 1;
        if (doc)
            s_no = doc.s_no + 1;

        data.s_no = s_no;
        db.insert(data, function (err, data) {
            console.log(data)
            M.toast({ html: 'Successfully created' });
            setTimeout(() => {
                var window = remote.getCurrentWindow();
                window.close();
            }, 3000)
        });
    });
});


var user = {
    name: "",
    phone: "",
    address: "",
    shalwar_kamees: {
        length: "",
        shoulder: "",
        sleeves: "",
        collar: "",
        chest: "",
        waist: "",
        front: "",
        daman: "",
        length: "",
        bottom: "",
    },
    waist_coat: {
        length: "",
        shoulder: "",
        sleeves: "",
        collar: "",
        chest: "",
        waist: "",
        front: "",
        daman: "",
        length: "",
        bottom: "",
    },
    shirt: {
        length: "",
        shoulder: "",
        sleeves: "",
        collar: "",
        chest: "",
        waist: "",
        front: "",
        daman: "",
        length: "",
        bottom: "",
    },
    pant: {
        length: "",
        shoulder: "",
        sleeves: "",
        collar: "",
        chest: "",
        waist: "",
        front: "",
        daman: "",
        length: "",
        bottom: "",
    }
};