'use strict';

(function () {
    const config = require('.././js/config.js'),
        mongoose = require('mongoose'),

        Todo = require('.././js/schemes/todoScheme'),

        dbUrl = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            config.mongoDB.url;

    var db;

    mongoose.connect(dbUrl);
    db = mongoose.connection;

    db.on('error', function () {
        console.error('Connection error:');
    });

    db.once('open', function () {
        console.log("Connected to DB!");
    });

    function getTodos(req, res, next) {
        Todo.find().select('-_id -__v')
            .then(data => res.json(data))
            .then(null, err => next(err));
    }

    function createTodo(req, res, next) {
        new Todo(req.body).save()
            .then(()=> res.json({success: true}))
            .then(null, err => next(err));
    }

    function deleteTodo(req, res, next) {
        Todo.findOneAndRemove({id: req.params.id})
            .then(() => res.json({success: true}))
            .then(null, err => next(err));
    }

    function updateTodo(req, res, next) {
        Todo.findOneAndUpdate({id: req.params.id}, req.body)
            .then(() => res.json({success: true}))
            .then(null, err => next(err));
    }

    module.exports = {
        getTodos: getTodos,
        createTodo: createTodo,
        deleteTodo: deleteTodo,
        updateTodo: updateTodo
    };
})();
