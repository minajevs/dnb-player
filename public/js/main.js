$(document).ready(() => {
    var ppBtn = $('#playPause');
    var songName = $('#songTitle');
    var volumeBar = $('#volumeBar');
    ppBtn.on('click', () => {
        var self = ppBtn;
        Player.toggle(
            () => { //onPlay
                songName.text(Player.song.name);
                self.text('Stop');
                self.prepend('<i class="stop icon"></i>');
                self.addClass('negative');
                self.removeClass('positive');
            },
            () => { //onPause
                songName.text('Not Playing');
                self.text('Play');
                self.prepend('<i class="play icon"></i>');
                self.addClass('positive');
                self.removeClass('negative')
            }
        );
    });

    volumeBar.on('input', () => {
        var self = volumeBar;
        Player.setVolume(self.val());
    });


    Player.init();
});

