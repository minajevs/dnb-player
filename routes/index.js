var express = require('express');
var utils = require('../bin/utils');
var config = require('../config/config');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',
        {
            title: 'DnB Player!',
        });
});


router.get('/tracks', function(req, res, next) {
    var id = req.query.id;
    var url = 'http://api.soundcloud.com/tracks/' + id + '/stream?client_id=' + config.soundcloud.clientID;
    req.pipe(request(url)).pipe(res);
});

module.exports = router;
