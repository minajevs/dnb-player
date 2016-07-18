var socket = io();

socket.on('syn', function(data) {
    socket.emit('ack', {data: 'connection from web', id: data.id});
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

var  Streamer = {};

Streamer.getRandomSong = function(callback){
    var self = this;
    self._onGetRandomSong = callback || function(){};
    socket.on('randomSong', function(data) {
        self._onGetRandomSong(data);
    });
    socket.emit('getRandomSong');
};

