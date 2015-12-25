(function () {

    var express = require('express'),
        db=require('./js/mongoose'),
        config = require('./js/config'),

        app = express();


    app.listen(config.express.port);

    app.use(express.static(__dirname + '/public'));

    app.route('/todos')
        .get(db.getTodos);

})();