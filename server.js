'use strict';

(function () {

    const express = require('express'),
        bodyParser = require('body-parser'),
        db=require('./js/mongoose'),
        config = require('./js/config'),

        app = express();


    app.listen(config.express.port);

    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.json());

    app.route('/todos')
        .get(db.getTodos)
        .post(db.createTodo);

    app.route('/todos/:id')
            .delete(db.deleteTodo)
            .put(db.updateTodo);

})();