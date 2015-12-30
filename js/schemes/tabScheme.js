'use strict';

(function () {
    const mongoose = require('mongoose'),
        tab = mongoose.Schema({
            id: {type: String, required: true, unique: true},
            value: String
        });

    module.exports = mongoose.model('Tab', tab);
}());