var Player = {
    song: {},
    playing: false,
    volume: 5,
    ctx: {},            //Buffer
    buf: {},            //Context
    analyser: {},       //Analyser
};

Player.init = function(){
    var self = this;
    try {
        Streamer.getRandomSong(data => {
            self.song = data;
            self.audio = new Audio();
            self.audio.controls = false;
            self.audio.autoplay = false;
            self.audio.loop = false;
            self.audio.setAttribute('src',data.url);
        });
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
        console.log(e);
    }
};

Player.play = function(callback){
    var self = this;
    self.audio.play();
    self.playing = true;
    typeof callback === 'function' && callback();
};

Player.pause = function(callback){
    var self = this;
    self.audio.pause();
    self.playing = false;
    typeof callback === 'function' && callback();
};

Player.load = function(callback){
    var self = this;
    Streamer.getRandomSong(data => {
        self.song = data;
        self.audio.setAttribute('src',data.url);
        typeof callback === 'function' && callback(data);
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

Player.setVolume = function(volume, callback){
    this.volume = volume;
    this.audio.volume = this.volume/5;
    typeof callback === 'function' && callback();
};



