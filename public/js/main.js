var ppBtn = $('#playPause');
var songName = $('#songTitle');
var nextSong = $('#nextSong');

var test = $('#test');

var progress = $('#progress');
var waveformWrapper = $('#waveformWrapper');

var volumeBar = $('#volumeBar');
var dropdownBtn = $('#dropdownBtn');
var dropdownIcon = $('#dropdownIcon');

var waveform = $('#waveform');

var maxVolume = 10;

var prevVolume;

$(document).ready(() => {
    $('.ui.dropdown').dropdown({
        on: 'hover',
        action: 'nothing',
        onChange: function(){}
    });

    progress.progress({
        percent: 0
    });

    dropdownBtn.on('click', (e) => {
        if(e.target.id != 'dropdownBtn' &&      //Prevent dropdown cliks
            e.target.id != 'dropdownIcon'){     //Allow only button clicks
            return;
        }
        if(Player.volume > 0){                  //Mute
            prevVolume = Player.volume;
            Player.setVolume(0);
            volumeBar.val(0);
            dropdownIcon.removeClass('up', 'down');
            dropdownIcon.addClass('off');
        } else {                                //Or restore from Mute
            Player.setVolume(prevVolume);
            volumeBar.val(prevVolume);
            dropdownIcon.removeClass('off');
            prevVolume === maxVolume ? dropdownIcon.addClass('up') : dropdownIcon.addClass('down');
        }
    });


    ppBtn.on('click', () => {
        Player.toggle(onPlay, onPause);
    });

    volumeBar.on('input', () => {
        var self = volumeBar;
        Player.setVolume(self.val(), maxVolume);
        if(self.val() > 7){ //maxVolume !!!!!!!!
            dropdownIcon.removeClass('up');
            dropdownIcon.removeClass('down');
            dropdownIcon.removeClass('off');
            dropdownIcon.addClass('up');
        } else if (self.val() > 0){
            dropdownIcon.removeClass('up');
            dropdownIcon.removeClass('down');
            dropdownIcon.removeClass('off');
            dropdownIcon.addClass('down')
        } else {
            dropdownIcon.removeClass('up');
            dropdownIcon.removeClass('down');
            dropdownIcon.removeClass('off');
            dropdownIcon.addClass('off');
        }
    });

    nextSong.on('click', () => {
        Player.next();
    });
    Player.init(
        '#waveform',
        onLoading,
        onReady,
        onReceived,
        () => {     //callback
            Player.setVolume(maxVolume, maxVolume);
            Player.play()
        });
});


function onLoop(audio){
    var buffered = 0,
        played = 0;
    if(audio.duration && audio.buffered.end(0)){
        buffered = (audio.buffered.end(audio.buffered.length-1)/audio.duration) * 100;
        played = (audio.currentTime/audio.duration) * 100;
    }
    pLoad.width(buffered + '%');
    pPlay.width(played + '%');
}

function onLoading(e){
    progress.show();
    progress.progress({
        percent: e
    });
}

function onReady(){
    progress.hide();
    Player.play(onPlay);
}

function onReceived(){
    console.log('onReceived');
    songName.text(Player.playlist.currentSong.title);
}

function onPlay(){
    songName.text(Player.song.title);
    ppBtn.text('Stop');
    ppBtn.prepend('<i class="stop icon"></i>');
    ppBtn.addClass('negative');
    ppBtn.removeClass('positive');
}

function onPause(){
    ppBtn.text('Play');
    ppBtn.prepend('<i class="play icon"></i>');
    ppBtn.addClass('positive');
    ppBtn.removeClass('negative')
}

