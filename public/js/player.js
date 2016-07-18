var Player = {
    song: {},
    playing: false,
    volume: 5,
    ctx: {},    //Buffer
    buf: {}     //Context
};

Player.init = function(){
    try {
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.loadFile();
        //this.audio = new Audio();
        //this.audio.src = 'http://www.bornemark.se/bb/mp3_demos/PoA_Sorlin_-_Stay_Up.mp3';
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
        console.log(e);
    }
};

Player.loadFile = function loadFile() {
    var self = this;
    var req = new XMLHttpRequest();
    req.open('GET','http://www.bornemark.se/bb/mp3_demos/PoA_Sorlin_-_Stay_Up.mp3',true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        self.ctx.decodeAudioData(req.response, function(buffer) {
            self.buf = buffer;
        });
    };
    req.send();
};

Player.play = function(callback){
    Streamer.getRandomSong(data => {
        this.song = data;
        this.playing = true;
        typeof callback === 'function' && callback(data);
    });
};

Player.pause = function(callback){
    this.playing = false;
    typeof callback === 'function' && callback(this.song);
};

Player.toggle = function(onPlay, onPause, onToggle){
    if(!this.playing){ //Play
        Streamer.getRandomSong(data => {
            this.song = data;
            this.playing = true;
            typeof onPlay === 'function' && onPlay(data);
        });
    } else {            //Pause
        typeof onPause === 'function' && onPause();
    }
    this.playing = !this.playing;
    typeof onToggle === 'function' && onToggle();
};

Player.setVolume = function(volume, callback){
    this.volume = volume;

    typeof callback === 'function' && callback();
};



