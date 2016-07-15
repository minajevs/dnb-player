var database = require('./bin/database');
var utils = require('./bin/utils');


module.exports = function (server) {
    var streamer = require('socket.io').listen(server);
    database.init();

    function sendTime() {
        streamer.emit('time', { time: new Date().toJSON() });
    }

    function sendSong(id){
        if(database.ready){
            id = id || utils.getRandomInt(0, database.songs.count()-1);
            var send = database.songs.data[id];
            console.log('Sending ' + send.name);
            streamer.emit('song', send);
        }
    }

    setInterval(sendTime, 1000*60);

    streamer.on('connection', function(socket) {
      socket.emit('welcome', { message: 'Welcome!', id: socket.id });
      socket.on('i am client', console.log);
      socket.on('getRandomSong', () => {sendSong()});
    });

    return streamer;
};