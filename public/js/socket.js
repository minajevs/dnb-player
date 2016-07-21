var Streamer = {};

Streamer.getRandomSong = function(excludeIds, callback = ()=>{}){
    $.get({
        url: '/api',
        data: {
            method: 'getRandomSong',
            excludeIds: excludeIds
        },
        success: callback
    });

    //this._onRandomSongReceived = callback;
    //socket.emit('getRandomSong',{excludeIds: excludeIds});
};

Streamer.getPlaylist = function(count, callback = ()=>{}){
    $.get({
        url: '/api',
        data: {
            method: 'getPlaylist',
            count: count
        },
        success: callback
    });
    //this._onPlaylistReceived = callback;
    //socket.emit('getPlaylist', {count: count});
};

//socket.on('syn', function(data) {
//    socket.emit('ack', {data: 'connection from web', id: data.id});
//});
//socket.on('error', console.error.bind(console));
//socket.on('message', console.log.bind(console));
//
//socket.on('randomSong', function(data) {
//    typeof Streamer._onRandomSongReceived === 'function' && Streamer._onRandomSongReceived(data);
//});
//
//socket.on('playlist', function(data) {
//    typeof Streamer._onPlaylistReceived === 'function' && Streamer._onPlaylistReceived(data);
//});


