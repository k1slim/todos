const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    db = require('./js/mongoose'),
    config = require('./js/config'),
    passport = require('./js/user'),
    app = express();

app.listen(config.express.port);

app.use(express.static(__dirname + '/build'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 't5o4d3o2s1',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.pass.initialize());
app.use(passport.pass.session());

require('./js/route')(app);