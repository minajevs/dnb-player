var Player = {
    song: {},
    playing: false,
    loading: false,
    volume: 5,
    ctx: {},            //Buffer
    buf: {},            //Context
    analyser: {},       //Analyser
    onLoading: {},      //Loading
    onReady: {}         //onReady
};

Player.init = function(container, onLoading, onReady, callback){
    var self = this;
    self.audio = WaveSurfer.create({
        container: container,
        waveColor: '#829090',
        progressColor: '#008A85',
        //backend: 'MediaElement',

        barWidth: 2,
        height: 50,
    });
    try {
        self.onLoading = onLoading;
        self.onReady = onReady;
        self.audio.on('loading', self.onLoading);
        self.load();
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

Player.load = function(callback){
    var self = this;
    Streamer.getRandomSong(data => {
        self.song = data;
        self.pause();
        self.loading = true;
        self.audio.load(self.song.url);
        self.audio.on('ready', function () {
            self.loading = false;
            self.onReady();
            typeof callback === 'function' && callback();
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

Player.setVolume = function(volume, maxVolume,  callback){
    this.volume = volume/maxVolume;
    this.audio.setVolume(this.volume);
    typeof callback === 'function' && callback();
};




