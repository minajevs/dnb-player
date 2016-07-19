var socket = io();

var Streamer = {};

Streamer.getRandomSong = function(callback = ()=>{}){
    this._onRandomSongReceived = callback;
    socket.emit('getRandomSong');
};

socket.on('syn', function(data) {
    socket.emit('ack', {data: 'connection from web', id: data.id});
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

socket.on('randomSong', function(data) {
    typeof Streamer._onRandomSongReceived === 'function' && Streamer._onRandomSongReceived(data);
});


