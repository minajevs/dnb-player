var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var songs = req.songs.data.slice(),
        currentSong = songs.pop();
    res.render('index',
        {
          title: 'DnB Player!',
            songs: songs,
            currentSong: currentSong
        });
});

router.get('/tracklist', function(req, res, next) {
  var songs = req.songs.data;
  res.render('tracklist',
      {
          title: 'Tracklist',
          songs: songs
      });
});

module.exports = router;
