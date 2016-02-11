var express = require('express');
var router = express.Router();
var stationLoader = require('../api/station-loader');

router.get('/', function(request, response, next) {
    response.render('index', { title: 'Express' });
});

router.get('/api/station/:name', function(request, response, next) {
    stationLoader.getStation(request.params.name, function(obj) {
        response.send(obj);
    });
});

module.exports = router;
