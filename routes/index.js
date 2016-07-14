var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {
        title: 'Express',
      });
});

router.get('/tracklist', function(req, res, next) {
  var songs = req.songs.data;
  console.log(songs);
  res.render('tracklist',
      {
          title: 'Tracklist',
          songs: songs
      });
});

module.exports = router;
