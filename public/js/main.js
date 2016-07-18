var ppBtn = $('#playPause');
var songName = $('#songTitle');
var volumeBar = $('#volumeBar');
var nextSong = $('#nextSong');

$(document).ready(() => {
    ppBtn.on('click', () => {
        Player.toggle(onPlay, onPause);
    });

    volumeBar.on('input', () => {
        var self = volumeBar;
        Player.setVolume(self.val());
    });

    nextSong.on('click', () => {
        Player.pause();
        Player.load(function(data){
            console.log('loaded');
            Player.play(onPlay);
        });
    });

    Player.init();
});


function onPlay(){
    songName.text(Player.song.name);
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

