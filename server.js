'use strict';

(function () {

    const express = require('express'),
        bodyParser = require('body-parser'),
        db = require('./js/mongoose'),
        config = require('./js/config'),

        app = express();

    app.listen(config.express.port);

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());

    app.get('/todos/:tab', db.getTodos);
    app.post('/todo', db.createTodo);
    app.route('/todo/:id')
        .delete(db.deleteTodo)
        .put(db.updateTodo);

    app.get('/tabs', db.getTabs);
    app.post('/tab', db.createTab);
    app.route('/tab/:id')
        .delete(db.deleteTab)
        .put(db.updateTab);
})();