var Playlist = {
    songs: [],
    currentSong: {},

    size: 10
};

Playlist.init = function(callback){
    var self = this;
    Streamer.getPlaylist(self.size, data => {
        self.songs = data;
        self.currentSong = self.songs[0];
        typeof callback === 'function' && callback();
    });
};

Playlist.shift = function(callback){
    var self = this;
    var excludeIds = self.songs.map((el) => {return el.id});
    self.songs.shift();
    Streamer.getRandomSong(excludeIds, data => {
        self.songs.push(data);
        self.currentSong = this.songs[0];
    });
    typeof callback === 'function' && callback();
};