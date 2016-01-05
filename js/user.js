'use strict';

(function () {
    const passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('.././js/schemes/userScheme'),
        db = require('.././js/mongoose');

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username})
                .then(user => {
                    console.log('q' + user);
                    if (!user) {
                        console.log('!user');
                        return done(null, false, {status: 'Incorrect username'});
                    }
                    if (!user.comparePassword(password)) {
                        console.log('!pass');
                        return done(null, false, {status: 'Incorrect password'});
                    }
                    return done(null, user);
                })
                .then(null, err => {
                    console.error(err);
                    return done(err);
                });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .then(null, err => done(err));
    });

    function login(req, res, next) {
        console.log('auth');
        var isSessionEnable = (req.query.session === 'true');

        passport.authenticate('local', function (err, user, info) {
            if (err) {
                res.send(info);
                return next(err);
            }
            if (!user) {
                res.send(info);
                return next(err);
            }
            req.logIn(user, {session: isSessionEnable}, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send({status: 'Login successful', user: user.id});
            });
        })(req, res, next);
    }

    function logout(req, res) {
        req.logout();
    }

    function register(req, res, next) {
        var user = new User;
        user.id = `${Date.now()}${~~(Math.random() * 100)}`;
        user.username = req.query.username;
        user.pass = req.query.password;
        user.save()
            .then(() => {
                db.initializeTabs(user.id);
                res.send('true');
            })
            .then(null, err => next(err));
    }

    function getSession(req, res) {
        var user = req.user;
        res.send(user ? user.id : 'false');
    }

    module.exports = {
        pass: passport,
        login: login,
        logout: logout,
        register: register,
        getSession: getSession
    }
})();