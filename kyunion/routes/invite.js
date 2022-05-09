const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../controller/passport').User;
const Invite = require('../controller/passport').Invite;
const inPass = require('../controller/passport')
const bcrypt = require('bcryptjs');

const { get } = require('http');
//let TOKEN_KEY = process.env.SESSION_SECRET1;

// router.get('/new', async function(req, res) {
//     res.render('new-iv')
// });

router.get('/:urlCode', async function(req, res) {
    let urlCode = req.params.urlCode;
    let payload = {};
    await inPass.getThisIV(urlCode)
    .then(function(get_res){
        if(get_res.response) {
            payload = get_res.payload;
            function pad(num, size) {
                num = num.toString();
                while (num.length < size) num = "0" + num;
                return num;
            };
            payload.ivSerial = pad(payload.id,3);
            res.render('invitation', {
                payload: payload
            })
        } else {
            res.redirect('/');
        }
    })
    
});

function genIVCode() {
    var text = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

function genUrlSecret(img) {
    var text = "", possible;
    if (img) {
        possible = "123";
    } else {
        possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-()_@^%$#*+=><?:;~";
        // var possible = "abcdefghijklmnpqrstuvwxyz0123456789";
    }
    if(img) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    } else {
        for (var i = 0; i < 43; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    }
    return text;
};

function checkAuthentication(req) {
    if(req.session) {
        if ((typeof req.session.passport !== 'undefined') &&
        (typeof req.session.passport.user !== 'undefined') &&
        (typeof req.session.passport.user.profile.email !== 'undefined')) {
            return true;
        } else {
            return false;
        }
    } return false;
};


module.exports = router;