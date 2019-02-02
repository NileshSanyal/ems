const express = require('express'); // framework
const app = express();

const session = require('express-session'); // session management
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');//cookie store
const bodyParser = require('body-parser');// form data collect

const path = require('path');

const moment = require('moment');

const flash = require('connect-flash');// for flash message

const fs = require('fs');

const engine = require('ejs-locals');// more facility for ejs templating

require('dotenv').config();// env

const port = process.env.PORT;

const routeLabel = require('route-label');
const namedRouter = routeLabel(app);

const passport = require('passport');

require('./config/passport')(passport);

const dbConfig = require('./config/database');

const config = require('./config/config');

// auth = require("./config/auth")(); 

const _ = require("underscore"); // js utility

var Q = require('q');

const Adminuser = require('./app/modules/admin/models/admin.model');

require('app-module-path').addPath(__dirname + '/app/modules');

const view_path = [path.join(__dirname,'./app/views'), path.join(__dirname,'./app/modules')];

var store = new MongoDBStore({
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    collection: 'activesessions'
  });

app.set('views', view_path);

// app.set('views', path.join(__dirname, './app/views'));

app.engine('ejs', engine);

app.set('view engine', 'ejs');

app.use(cookieParser()); // cookie parser config

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(session({
    secret: 'W$q4=25*8%v-}UV',
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.use(allowCrossDomain);

/*
    List of all admin routes
*/
fs.readdirSync('./app/routes/class').forEach(function (file) {

    if (file[0] == '.')
        return;
    else
        namedRouter.use('', '/' + process.env.CLASS_FOLDER_NAME, require('./app/routes/class/' + file));

});

fs.readdirSync('./app/routes/user').forEach(function (file) {

    if (file[0] == '.')
        return;
    else
        namedRouter.use('', '/' + process.env.USER_FOLDER_NAME, require('./app/routes/user/' + file));

});

fs.readdirSync('./app/routes/subject').forEach(function (file) {

    if (file[0] == '.')
        return;
    else
        namedRouter.use('', '/' + process.env.SUBJECT_FOLDER_NAME, require('./app/routes/subject/' + file));

});

fs.readdirSync('./app/routes/admin').forEach(function (file) {

    if (file[0] == '.')
        return;
    else
        namedRouter.use('', '/' + process.env.ADMIN_FOLDER_NAME, require('./app/routes/admin/' + file));

});


namedRouter.buildRouteTable();
routeList = namedRouter.getRouteTable();

console.log('ALL ROUTES: ', routeList);

generateUrl = function (route_name, route_param = {}) {
    return namedRouter.urlFor(route_name, route_param);
}

app.use(function (req, res, next) {
    res.status(404).render('admin_views/404.ejs', { pageTitle: 'Page Not Found', path: '/404' });
});

app.listen(port, function () {
    console.log('EMS is running on port ' + port);
});
