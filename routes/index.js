var express = require('express');
var utils = require('../bin/utils');
var config = require('../config/config');
var request = require('request');
var api = require('../controllers/api');
var database = require('../bin/database');
var Song = require('../bin/song');
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

router.get('/add', checkAuth, function(req, res){
    res.render('add');
});

router.post('/addTrack', checkAuth, function(req, res){
    var post = req.body;
    var url = 'http://api.soundcloud.com/tracks/' + post.id + '?client_id=' + config.soundcloud.clientID;
    var song = new Song();
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            song.mapFromJSON(JSON.parse(body));
            database.addSong(song);
            res.render('addedTrack', {song: song});
        }
    });
});

router.post('/deleteTrack', checkAuth, function(req, res){
    var post = req.body;
    database.deleteSongById(post.id);
    var songs = database.getAllSongs();
    res.render('allTracks', {songs: songs});
});

router.post('/login', function (req, res) {
    var post = req.body;
    if (post.user === '1' && post.password === '1') {
        req.session.user_id = 'dexie';
        res.redirect('/add');
    } else {
        res.send('Bad user/pass');
    }
});

router.get('/allTracks', function(req, res){
    utils.log('get all!!!!!!');
    var songs = database.getAllSongs();
    res.render('allTracks', {songs: songs});
});

router.get('/login', function (req, res) {
    res.render('login');
});

function checkAuth(req, res, next) {
    utils.log(req.session.user_id || 'unauthorized');
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = router;
