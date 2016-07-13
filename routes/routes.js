var express = require('express');
var router = express.Router();
var stationLoader = require('../api/station-loader');
var ticketLoader = require('../api/ticket-loader');
var seatLoader = require('../api/seat-loader');

router.get('/', function(request, response, next) {
    response.render('index', { title: 'Hakuna Matata' });
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

router.get('/api/seats', function(request, response, next) {
    seatLoader.findSeats(request.query, function(result) {
        response.send(result);
    })
});

//if (express.get('env') === 'development') {
//    var browserify = require('browserify-middleware');
//    router.get('/bundle.js', browserify('./client/js/index.js'));
//}

module.exports = router;
