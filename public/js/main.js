var ppBtn = $('#playPause');
var songName = $('#songTitle');
var currentTime = $('#currentTime');
var nextSong = $('#nextSong');
var progress = $('#progress');
var waveformWrapper = $('#waveformWrapper');

var volumeBar = $('#volumeBar');
var dropdownBtn = $('#dropdownBtn');
var dropdownIcon = $('#dropdownIcon');

var waveform = $('#waveform');
var playlist = $('#playlist');

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
        onPlaylistUpdate,
        onPlaying,
        () => {     //callback
            Player.setVolume(maxVolume, maxVolume);
            Player.play()
        });
});

function onLoading(e){
    progress.show();
    progress.progress({
        percent: e
    });
}

function onPlaylistUpdate(){
    $.get({
        url: '/playlist',
        data: {
            songs: Playlist.songs.map(function(el) {return el.id}).slice(1)
        },
        success: function(data){
            playlist.html(data);
        }
    })
}

function onReady(){
    progress.hide();
    Player.play(onPlay);
}

function onPlaying(){
    var time = Player.audio.getCurrentTime();
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    seconds = seconds < 10 ? '0'+seconds : seconds;
    currentTime.text(minutes + ':' + seconds);
}

function onReceived(){
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

