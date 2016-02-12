var express = require('express');
var router = express.Router();
var stationLoader = require('../api/station-loader');
var ticketLoader = require('../api/ticket-loader');

router.get('/', function(request, response, next) {
    response.render('index', { title: 'Express' });
});

router.get('/api/station/:name', function(request, response, next) {
    stationLoader.getStation(request.params.name, function(obj) {
        response.send(obj);
    });
});

router.get('/api/tickets', function(request, response, next) {
    ticketLoader.findTickets(request.query, function(result) {
        response.send(result);
    })
});

module.exports = router;
