
const bcrypt = require('bcryptjs');
const secret = process.env.DB_SECRET;
const LocalStrategy = require('passport-local');
const passport = require('passport');
const Sequelize = require('sequelize');
// const secret = '4ertyhfg#$%%)(32456hgfdtryturjgns@';
const seqTrans = require('sequelize-transforms');
const db = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql"
};

const {v4: uuidv4} = require('uuid');


seqTrans(Sequelize);
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(function() {
        console.log("Connected to KYU-DB");
    })
    .catch(function(err){
        console.error("Connection failed:", err);
    });

const User = sequelize.define('user', {
    id: {type: Sequelize.SMALLINT, autoIncrement: true},
    userid: {type: Sequelize.UUIDV4, unique: true, defaultValue: Sequelize.UUIDV4, primaryKey: true},
    username: {type: Sequelize.STRING, allowNull: false, unique: true, trim: true, validate: {notEmpty: true, min: 3}},
    firstname: {type: Sequelize.STRING, allowNull: false, trim: true, validate: {notEmpty: true, min: 3}},
    lastname: {type: Sequelize.STRING, allowNull: false, trim: true, validate: {notEmpty: true, min: 3}},
    hash: {type: Sequelize.STRING, allowNull: false},
    creatediv: {type: Sequelize.INTEGER},
    createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), trim: true},
    updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), trim: true}
});


const Invite = sequelize.define('invite', {
    id: {type: Sequelize.SMALLINT, autoIncrement: true},
    seatnumber: {type: Sequelize.INTEGER},
    inviteid: {type: Sequelize.UUIDV4, unique: true, defaultValue: Sequelize.UUIDV4, primaryKey: true},
    tablelabel: {type: Sequelize.STRING, allowNull: false, trim: true, validate: {notEmpty: true, min: 1}},
    guestname: {type: Sequelize.STRING, allowNull: false, trim: true, validate: {notEmpty: true, min: 3}},
    invitedby: {type: Sequelize.STRING, allowNull: false, trim: true, validate: {notEmpty: true, min: 3}},
    urlcode: {type: Sequelize.STRING, unique: true, allowNull: false, trim: true, validate: {notEmpty: true, min: 3}},
    createdby: {type: Sequelize.UUIDV4, unique: true, defaultValue: Sequelize.UUIDV4},
    createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), trim: true},
    updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), trim: true}
});


// passport.use(new LocalStrategy(async function(username, password, done) {
//       await User.findOne({where: {username: username}}, function (err, user) {
//           if (err) {
//               return done(err);
//           }
//           if (!user) {
//               return done(null, false);
//           }
//           if (bcrypt.compareSync(password, user.hash)){
//             return done(null, user);
//           }
//           return done(null, false);
          
//       });
//     }
// ));


async function auth(username,password) {
    let response = false;
    let payload = {};
    let msg = "";
    const user = await User.findOne({where: {username:username}});
    if (user) {
        if (bcrypt.compareSync(password, user.hash)) {
            payload.user = {
                'profile': {
                    firstName: user.firstname,
                    lastName: user.lastname,
                    id: user.userid,
                    username: user.username
                }
            };
            response = true;
            let invites = await Invite.findAll({});
            payload.iv = invites;
            msg = "Login Successful"
        } else {
            msg = 'Username or Password invalid'
        }
    }
    return {
        response,
        payload,
        msg
    }
};

async function getThisIV(urlCode) {
    let response = false;
    let payload = {};
    let msg = "";
    const iv = await Invite.findOne({where: {urlcode:urlCode}});
    if (iv) {
        payload = iv;
        response = true;
        msg = "Successful"
    } else {
        msg = 'Invalid IV'
    }
    return {
        response,
        payload,
        msg
    }
};

async function createInvite(username, inload) {
    let response = false,
        payload = {};
    if (username && inload) {

    }
    return {
        response,
        payload
    }
};

async function getAllInvite(username) {
    let response = false;
    let payload = [];
    if (username) {
        const allInvited = await Invite.findAll({order:[['createdAt', 'DESC']]});
        if (allInvited) {
            response = true;
            payload = allInvited;
        }
    }
    return {
        response,
        payload
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = {
    auth,
    User,
    Invite,
    passport,
    getThisIV,
    getAllInvite
}