'use strict';

(function () {
    const mongoose = require('mongoose'),
        todo = mongoose.Schema({
            id: {type: String, required: true, unique: true},
            value: String,
            done: {type: Boolean, default: false},
            tab: String
        });

    module.exports = mongoose.model('Todo', todo);
}());