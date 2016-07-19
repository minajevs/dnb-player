var express = require('express');
var utils = require('../bin/utils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',
        {
          title: 'DnB Player!',
        });
});

module.exports = router;
