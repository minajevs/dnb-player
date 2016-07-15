var socket = io();

socket.on('syn', function(data) {
    socket.emit('ack', {data: 'connection from web', id: data.id});
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

var  Streamer = {};

Streamer.getRandomSong = function(callback){
    this._onGetRandomSong = callback;
    socket.on('randomSong', function(data) {
        Streamer._onGetRandomSong(data);
    });
    socket.emit('getRandomSong');
};

