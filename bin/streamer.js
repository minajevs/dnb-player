var database = require('./database');
var utils = require('./utils');


module.exports = function (server) {
    var streamer = require('socket.io').listen(server);
    database.init();

    function sendRandomSong(excludeIds = []){
        if(database.ready){
            utils.log(excludeIds);
            var song;
            if(excludeIds.length <= database.songs.count()) {
                song = database.songs.findOne({id: excludeIds[0]});
                utils.log(song.title);
            }
            else {
                do{
                    song = database.songs.data[utils.getRandomInt(0, database.songs.count()-1)];
                    utils.log('rnd song:  ' + song.title);
                } while(excludeIds.indexOf(song.id) == -1);
            }
            utils.log('Sending ' + song.title);
            streamer.emit('randomSong', song);
        }
    }

    function sendPlaylist(count){
        if(database.ready){
            var send = utils.takeRandom(database.songs.data, count);
            utils.log('Sending ' + send.length);
            streamer.emit('playlist', send);
        }
    };

    streamer.on('connection', function(socket) {
      socket.emit('syn', { message: 'Welcome!', id: socket.id });
      socket.on('ack', console.log);

      socket.on('getRandomSong', (data) => {
          utils.log('getrandomsong received');
          sendRandomSong(data.excludeIds);
      });

      socket.on('getPlaylist', (data) => {
          utils.log('getPlaylist received');
          sendPlaylist(data.count);
      })
    });

    return streamer;
};