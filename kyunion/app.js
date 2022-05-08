const createError = require('http-errors');
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const noCache = require('nocache');
const dotenv = require('dotenv').config();
const passport = require('./controller/passport').passport;
const nunjucks = require('nunjucks');
const {v4: uuidv4} = require('uuid');

console.log(uuidv4());
//dotenv.config();

// const csurfMiddleware = csurf({
//   cookie: false
// });
// let connection = mysql.createConnection({})
const session = require('express-session');
// let MySQLStore = require('express-mysql-session')(session);
let sessionStore = require('session-file-store')(session);


const session_options = {
    store: new sessionStore({logFn: function(){}}),
    secret: '4ertyhfg#$%%)(32456hgfdtryturjgns@',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1800000
    },
    name: 'kyu.sid'
};
// let msqlOptions = {
//   host: process.env.DB_HOST,
//   port: 3306,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.STORE_DB
// };

// let sessionSchema = {
//   tableName: 'sessions',
//   columnNames: {
//     session_id: 'session_id',
//     expires: 'expires',
//     data: 'data'
//   }
// };
// let msSessionConnect = mysql.createPool(msqlOptions);
// let sessionStore = new MySQLStore({sessionSchema}, msSessionConnect);
// const session_options = {
//     store: sessionStore,
//     secret: '4ertyhfg#$%%)(32456hgfdtryturjgns@',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: true,
//         maxAge: 1800000
//     },
//     name: 'kyu.sid'
// };



const MainRouter = require('./routes/index');
const IVRouter = require('./routes/invite');
const { request } = require('http');

const app = express();
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

nunjucks.configure('views', {
  express: app,
  autoescape: true
});

app.set('view engine', 'html');
app.use(session(session_options));

app.use(compression());
//app.use(cookieParser());
// app.use(helmet());
// app.use(
//   helmet.hsts({
//     maxAge: 123,
//     includeSubDomains: false
//   })
// );
app.use(helmet.hidePoweredBy({setTo: 'KY-Union 2022'})); //change value of X-Powered-By header to given value
app.use(noCache({noEtag: true})); //set Cache-Control header
app.use(helmet.noSniff());    // set X-Content-Type-Options header
// app.use(helmet.frameguard()); // set X-Frame-Options header
app.use(helmet.xssFilter());  // set X-XSS-Protection header

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));
//app.set('view engine','nunjucks');

//app.use(csurfMiddleware);
app.use('/', MainRouter);
app.use('/', IVRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//every route after this line will requires login


// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.status == 403) {
      console.log(err.code);
      res.redirect('/')
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render('error', {errorPage: true})
  }
});


// module.exports = ensureAuthenticated;

module.exports = app;
// module.exports = httpApp;
