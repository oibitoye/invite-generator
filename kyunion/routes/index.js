const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../controller/passport').User;
const Invite = require('../controller/passport').Invite;
const inPass = require('../controller/passport');
const bcrypt = require('bcryptjs');

const { get } = require('http');


router.get('/', async function(req, res) {
    let user = null;
    let loggedIn = false;
    if (checkAuthentication(req)|| req.isAuthenticated()) {
        loggedIn = true,
        user = {
            'lastName': req.session.passport.user.profile.lastName,
            'firstName': req.session.passport.user.profile.firstName,
            'username': req.session.passport.user.profile.username
        };
        res.redirect('/created');
        // await Invite()
        // res.status(200);
        // res.send(JSON.stringify( {
        // user:user}, null, 4));
    } else {
        res.redirect('/login')
    }
});

router.post('/new', async function(req, res) {
    let user = null;
    let loggedIn = false;
    console.log(JSON.stringify(req.body,null,4));
    if (checkAuthentication(req)|| req.isAuthenticated()) {
        loggedIn = true,
        user = {
            'lastName': req.session.passport.user.profile.lastName,
            'firstName': req.session.passport.user.profile.firstName,
            'username': req.session.passport.user.profile.username,
            'userid': req.session.passport.user.profile.id
        };
        let guests = [];
        let = outList = []
        let reqBody = req.body;
        for (let key in reqBody) {
            if (key.includes("guest") && reqBody[key] != "") {
                guests.push(reqBody[key]);
            };
        };
        

        for(let item in guests) {
            let payload = {
                guestname: guests[item],
                createdby: user.userid,
                urlcode: genIVCode(),
                tablelabel: reqBody.tablelabel,
                invitedby: reqBody.invitedby
            };
            payload.guestname = encodeURI(payload.guestname);
            if (reqBody.invitedby == "AddHost" && reqBody.new_host_name != "") {
                payload.invitedby = reqBody.new_host_name;
                await inPass.addHost(reqBody.new_host_name);
            } else {
                payload.invitedby = "Unattached"
            };
            if (reqBody.tablelabel == "AddTable" && reqBody.new_table_name != "") {
                payload.tablelabel = reqBody.new_table_name;
                await inPass.addTable(reqBody.new_table_name);
            } else {
                payload.tablelabel = "Unassigned"
            };
            outList.push(payload);
        };
        await inPass.bulkInvite(user.username,outList)
        .then(function(resp){
            res.redirect('/created')
        })

    
        // await Invite()
        // res.status(200);
        // res.send(JSON.stringify( {
        // user:user}, null, 4));
    } else {
        res.redirect('/login')
    }
});

router.get('/new', async function(req, res) {
    let user = null;
    let loggedIn = false;
    let allHosts = [];
    let allTables = [];
    let payload = {},
        errors = {},
        info = {};
    if (checkAuthentication(req)|| req.isAuthenticated()) {
        loggedIn = true,
        user = {
            'lastName': req.session.passport.user.profile.lastName,
            'firstName': req.session.passport.user.profile.firstName,
            'username': req.session.passport.user.profile.username
        };
        let getHosts = (await inPass.getHosts()).payload;
        console.log("Hosts List: " + JSON.stringify(getHosts,null,4));
        for (let key in getHosts) {
            if (getHosts[key] != "") {
                allHosts.push(getHosts[key].hostname);
                console.log("Hosts: " + getHosts[key].hostname)
            };
        };
        let getTables = (await inPass.getTables()).payload;
        for (let key in getTables) {
            if (getTables[key] != "") {
                allTables.push(getTables[key].label);
            };
        };
        res.render('new-iv',{
            user:user,
            payload: payload,
            errors,
            allHosts,
            allTables,
            info
        });
    } else {
        res.redirect('/login')
    }
    
});

router.get('/created', async function(req, res) {
    let user = null;
    let creators_placeholder = {};
    let loggedIn = false;
    let response = false,
        payload = [];
    if (checkAuthentication(req)|| req.isAuthenticated()) {
        loggedIn = true,
        user = {
            'lastName': req.session.passport.user.profile.lastName,
            'firstName': req.session.passport.user.profile.firstName,
            'username': req.session.passport.user.profile.username,
            'id': req.session.passport.user.profile.id
        };
        await inPass.getAllInvite(user.username)
        .then(async function(get_res){
            if(get_res.response){
                payload = get_res.payload;
                response = true;
                for(let i=0;i < payload.length;i++){
                    let date = new Date(payload[i].createdAt);
                    payload[i].seatnumber = payload[i].id;
                    payload[i].timestamp = date.getDate()+
                    "/"+(date.getMonth()+1)+
                    "/"+date.getFullYear()+
                    " "+date.getHours()+
                    ":"+date.getMinutes()+
                    ":"+date.getSeconds();
                    payload[i].guestname = decodeURI(payload[i].guestname);
                    if(payload[i].createdby in creators_placeholder){
                        payload[i].creator = creators_placeholder[payload[i].createdby]
                    } else {
                        let createdby = await inPass.User.findOne({
                            attributes:['firstname'],
                            where: {userid:payload[i].createdby}
                        });
                        creators_placeholder[payload[i].createdby] = createdby.firstname;
                        payload[i].creator = createdby.firstname;
                    };
                
                }
            } else {
            }
        });
        // console.log(JSON.stringify(payload,null,4));
        res.render('created2', {
            user: user,
            payload: payload,
            info: req.session.info,
            loggedIn: loggedIn,
            host: req.headers.host
        })
    } else {
        res.redirect('/login')
    }
});


/* Login Locally. */

router.post('/auth', async function(req, res, next) {
    delete req.session.errors;
    delete req.session.info;
    // let secret = bcrypt.genSaltSync(15);
    // console.log(secret);
    // console.log(bcrypt.hashSync('Luwamide@123', secret));
    let user_load = {};
    let errors = [];
    let username = req.body.username,
        password = req.body.pass;
    if(username && password) {
        await inPass.auth(username, password)
            .then(function(auth_res){
                if (!auth_res.response){
                    let error = {};
                    error.param = 'Login Error';
                    error.msg = auth_res.msg;
                    errors.push(error);
                    req.session.errors = errors;
                    res.redirect('/login')
                } else {
                    info = {
                        "type": "success",
                        "msg": " Welcome " + auth_res.payload.user.profile.firstName
                    };
                    req.session.info = info;
                    req.session.passport = {};
                    req.session.passport.user = {};
                    req.session.passport.invites = auth_res.payload.iv;
                    req.session.passport.user.profile = auth_res.payload.user.profile;
                    // req.session.passport.user.profile.username = auth_res.payload.user.profile.username;
                    req.session.passport.urlSecret = genUrlSecret();
                    res.redirect('/created');
                }
            })
            .catch(function(err){
                console.error(err)
            });
        // } else {
        //     console.log(errors);
        //     switch (redirectUrl) {
        //         case "/wallet/create":
        //         res.render('wallet_create');
        //         break;
        //         case "/wallet":
        //         res.render('wallet');
        //         break;
        //         default: res.render('home');
        //         break;
        //     }
        //
        // }
    } else {
        let error = {};
        error.param = 'Login Error';
        error.msg = "Username or Password not supplied";
        errors.push(error);
        req.session.errors = errors;
        res.redirect('/login')
    }
});


router.get('/logout', async function(req, res){
    // If authenticated via passport
    if (req.isAuthenticated()) {
        req.logout();
        req.session.destroy();
        res.redirect('/');
        // if authenticated via local auth
    } else if (checkAuthentication(req)) {
        req.session.destroy(function (err) {
            if (req.session) {
                if (err) {
                }
                else {
                }
            }
            else {
            }
        });
        res.redirect('/');
    } else res.redirect('/');
});

router.get('/login', function(req, res, next) {
    let errors = req.session.errors,
        info = req.session.info;
    if (checkAuthentication(req) || req.isAuthenticated()) {
        res.redirect('/created');
    } else {
        delete req.session.errors;
        delete req.session.info;
        res.render('login', {
            //csrfToken: req.csrfToken(),
            errors,
            info
        })
    }
});

function genIVCode() {
    var text = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};
async function getSeatnumber() {
    let response = await inPass.getSeats();
    console.log("Response: " + JSON.stringify(response.payload, null, 4));
    return response.payload;
    // console.log(JSON.stringify(takenSeats,null,4));
}
function seatNumber() {
    let text = "";
    let seatChosen = false;
    let possible = "0123456789";
    let takenSeats = getSeatnumber();
    console.log(JSON.stringify(takenSeats,null,4));
    function genSeatnumber(){
        for (var i = 0; i < 3; i++) {
            return text += possible.charAt(Math.floor(Math.random() * possible.length));
        };
        for (let i=0; i<takenSeats.length;i++) {
            if (takenSeats[i].seatnumber == text) {
                seatChosen = true;
                break;
            }
        }
        if(parseInt(text) > 600 || seatChosen) {
            genSeatnumber();
        } else {
            return text
        }
    };
    return genSeatnumber();
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
