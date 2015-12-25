(function () {
    var mongoose = require('mongoose'),
        todo = mongoose.Schema({
            value: String,
            done: Boolean,
            tab:String
        });

    module.exports = mongoose.model('Todo', todo);
}());