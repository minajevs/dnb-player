$(document).ready(() => {
    var playing = false;
    var ppBtn = $('#playPause');
    ppBtn.on('click', () => {
        var self = ppBtn;
        if(playing){
            self.text('Play');
            self.prepend('<i class="play icon"></i>');
            self.addClass('positive');
            self.removeClass('negative');
            onStopClick();
        } else {
            self.text('Stop');
            self.prepend('<i class="stop icon"></i>');
            self.addClass('negative');
            self.removeClass('positive');
            onPlayClick();
        }
        playing = !playing;
    });

    var onPlayClick = function(){
        Streamer.getRandomSong(setSong);
    };

    var onStopClick = function(){

    };

    function setSong(song){
        $('#songTitle').text(song.name);
    }
});