var utils = require('../bin/utils');
var database = require('../bin/database');

module.exports = function(req, res){
    var method = req.query.method;
    if(method == 'getRandomSong'){
        var excludeIds = req.query.excludeIds || [];
        if(database.ready){
            var song;
            if(excludeIds.length == 0){
                song = database.songs.data[utils.getRandomInt(0, database.songs.count()-1)];
            } else if(excludeIds.length <= database.songs.count()) {
                song = database.songs.findOne({id: excludeIds[0]});
            }
            else {
                do{
                    song = database.songs.data[utils.getRandomInt(0, database.songs.count()-1)];
                } while(excludeIds.indexOf(song.id) == -1);
            }
            utils.log('Sending ' + song.title);
            res.json(song);
        }
    } else if (method == 'getPlaylist'){
        var count = req.query.count || 10;
        if(database.ready){
            var send = utils.takeRandom(database.songs.data, count);
            utils.log('Sending ' + send.length);
            res.json(send);
        }
    } else {
        res.json({error: true});
    }
};