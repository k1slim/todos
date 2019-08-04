const passport = require('.././js/user'),
    db = require('.././js/mongoose'),
    http = require('http');
var request = require("http");

module.exports = function (app) {
    app.route('/session')
        .get(passport.getSession);

    app.route('/login')
        .post(passport.login);

    app.route('/register')
        .get(passport.register);

    app.route('/logout')
        .get(passport.logout);

    app.route('/todos/:tab')
        .get(db.getTodos);

    app.route('/todo')
        .post(db.createTodo);

    app.route('/todo/:id')
        .delete(db.deleteTodo)
        .put(db.updateTodo);

    app.route('/tabs/:user')
        .get(db.getTabs);

    app.route('/tab')
        .post(db.createTab);

    app.route('/tab/:id')
        .delete(db.deleteTab)
        .put(db.updateTab);
};