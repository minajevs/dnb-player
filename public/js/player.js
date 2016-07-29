var Player = {
    song: {},
    audio: {},
    playing: false,
    loading: false,
    volume: 5,

    playlist: Playlist,

    ctx: {},            //Buffer
    buf: {},            //Context
    analyser: {},       //Analyser
    onLoading: {},      //Loading
    onReady: {},         //onReady
    onReceived: {},         //onReady
    onFinish: {},
    onPlaying: {},
    _onPlaying: function(){
        if(this.song.duration-this.audio.getCurrentTime() < 5){

        }
        this.onPlaying();
    }
};

Player.init = function(container, onLoading, onReady, onReceived, onPlaylistUpdate, onPlaying, callback){
    var self = this;
    self.audio = WaveSurfer.create({
        container: container,
        waveColor: '#829090',
        progressColor: '#00b5ad',
        //backend: 'MediaElement',

        barWidth: 2,
        height: 50,
    });

    try {
        self.onLoading = onLoading;
        self.onReady = onReady;
        self.onReceived = onReceived;
        self.onPlaying = onPlaying;
        self.audio.on('loading', self.onLoading);
        self.audio.on('audioprocess', self.onPlaying);
        self.audio.on('finish', () => {self.next()});
        self.playlist.init(onPlaylistUpdate, () => {
            self.load('', callback);
        });
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
        console.log(e);
    }
};

Player.play = function(callback){
    var self = this;
    if(!self.loading && !self.playing) {
        self.audio.play();
        self.playing = true;
    }
    typeof callback === 'function' && callback();
};

Player.pause = function(callback){
    var self = this;
    if(self.playing && !self.loading){
        self.audio.pause();
        self.playing = false;
    }
    typeof callback === 'function' && callback();
};

Player.load = function(song, callback){
    var self = this;
    self.song = song || self.playlist.currentSong;
    self.pause();
    self.loading = true;
    self.audio.load(self.song.url);
    self.audio.on('ready', function () {
        self.loading = false;
        self.song.duration = self.audio.getDuration();
        self.onReady();
        typeof callback === 'function' && callback()
    });
};

Player.toggle = function(onPlay, onPause, onToggle){
    var self = this;
    if(!self.playing){ //Play
        self.play(onPlay);
        typeof onToggle === 'function' && onToggle();
    } else {            //Pause
        self.pause(onPause);
        typeof onToggle === 'function' && onToggle();
    }
};

Player.setVolume = function(volume, maxVolume,  callback){
    this.volume = volume/maxVolume;
    this.audio.setVolume(this.volume);
    typeof callback === 'function' && callback();
};

Player.next = function(callback){
    var self = this;
    self.playlist.shift();
    self.pause();
    self.onReceived();
    self.load(self.playlist.currentSong, () => {
        typeof callback === 'function' && callback();
    });
};

Player.switchToPreloaded = function(){

};




