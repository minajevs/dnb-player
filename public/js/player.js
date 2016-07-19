var Player = {
    song: {},
    playing: false,
    loading: false,
    playingPromise: {
        then: function(cb){cb();}
    },
    volume: 5,
    ctx: {},            //Buffer
    buf: {},            //Context
    analyser: {},       //Analyser
    loop: '',           //LOOP
    onLoop: function(){}
};

Player.skipTo = function(percent){
    var self = this;
    var delta = self.audio.duration / 100;
    self.audio.currentTime = percent*delta;
};

Player.init = function(){
    var self = this;
    try {
        Streamer.getRandomSong(data => {
            self.song = data;
            self.audio = generateAudio(data.url);
            self.loop = setInterval(function(){
                self.onLoop(self.audio);
            },500);
        });
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
        console.log(e);
    }
};

Player.play = function(callback){
    var self = this;
    self.playingPromise = self.audio.play();
    self.playingPromise.then(() => {
        self.playing = true;
        self.loading = false;
        typeof callback === 'function' && callback();
    });
};

Player.pause = function(callback){
    var self = this;
    self.audio.pause();
    self.playing = false;
    typeof callback === 'function' && callback();
};

Player.load = function(callback){
    var self = this;
    if(self.loading) return; //exclude multiple requests
    self.loading = true;
    self.playingPromise.then(() => {
        Streamer.getRandomSong(data => {
            self.song = data;
            self.audio.setAttribute('src',data.url);
            self.play(callback);
        });
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

function generateAudio(src){
    var audio = new Audio();
    audio.controls = false;
    audio.autoplay = false;
    audio.loop = false;
    audio.setAttribute('src',src);
    return audio;
}



