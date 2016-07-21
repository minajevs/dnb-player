var express = require('express');
var utils = require('../bin/utils');
var config = require('../config/config');
var request = require('request');
var api = require('../controllers/api');
var database = require('../bin/database');
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

router.get('/api', function(req, res, next){
    api(req,res);
});

router.get('/playlist', function(req, res, next){
    var songIds = req.query.songs;
    var songs = songIds.map(function(id){
        return database.songs.findOne({id: id});
    });
    //res.json(songs);
    res.render('playlist', {songs: songs});
});

module.exports = router;
