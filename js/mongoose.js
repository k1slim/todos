(function () {
    var config = require('.././js/config.js'),
        mongoose = require('mongoose'),
        Todo = require('.././js/schemes/todoScheme'),

        dbUrl = process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            config.mongoDB.url,
        db;

    mongoose.connect(dbUrl);
    db = mongoose.connection;

    db.on('error', function () {
        console.error('Connection error:');
    });
    db.once('open', function () {
        console.log("Connected to DB!");
    });

    function getTodos(req, res) {
        //new Todo(({text:'text',done:true,tab:'1'})).save();

        Todo.find().select('-_id -__v')
            .then(data => res.json(data));
    }

    module.exports = {
        getTodos: getTodos
    };
})();
