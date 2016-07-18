var database = require('./database');
var utils = require('./utils');


module.exports = function (server) {
    var streamer = require('socket.io').listen(server);
    database.init();

    function sendRandomSong(id){
        console.log('send random song called');
        if(database.ready){
            id = id || utils.getRandomInt(0, database.songs.count()-1);
            var send = database.songs.data[id];
            console.log('Sending ' + send.name);
            streamer.emit('randomSong', send);
        }
    }

    streamer.on('connection', function(socket) {
      socket.emit('syn', { message: 'Welcome!', id: socket.id });
      socket.on('ack', console.log);

      socket.on('getRandomSong', () => {
          console.log('getrandomsong received');
          sendRandomSong();
      });
    });

    return streamer;
};