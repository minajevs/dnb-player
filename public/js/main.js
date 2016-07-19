var ppBtn = $('#playPause');
var songName = $('#songTitle');
var nextSong = $('#nextSong');

var volumeBar = $('#volumeBar');
var dropdownBtn = $('#dropdownBtn');
var dropdownIcon = $('#dropdownIcon');

var prevVolume;

$(document).ready(() => {
    $('.ui.dropdown').dropdown({
        on: 'hover',
        action: 'nothing',
        onChange: function(){}
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
            prevVolume === 5 ? dropdownIcon.addClass('up') : dropdownIcon.addClass('down');
        }
    });


    ppBtn.on('click', () => {
        Player.toggle(onPlay, onPause);
    });

    volumeBar.on('input', () => {
        var self = volumeBar;
        Player.setVolume(self.val());
        if(self.val() == 5){
            console.log('up');
            dropdownIcon.removeClass('up');
            dropdownIcon.removeClass('down');
            dropdownIcon.removeClass('off');
            dropdownIcon.addClass('up');
        } else if (self.val() > 0){
            console.log('down');
            dropdownIcon.removeClass('up');
            dropdownIcon.removeClass('down');
            dropdownIcon.removeClass('off');
            dropdownIcon.addClass('down')
        } else {
            console.log('off');
            dropdownIcon.removeClass('up');
            dropdownIcon.removeClass('down');
            dropdownIcon.removeClass('off');
            dropdownIcon.addClass('off');
        }
    });

    nextSong.on('click', () => {
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

