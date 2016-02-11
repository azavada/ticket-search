var express = require('express');
var router = express.Router();
var stationLoader = require('./station-loader');

router.get('/:name', function(req, res, next) {
    stationLoader.getStation(req.params.name, function(obj) {
        res.send(obj);
    });
});

module.exports = router;