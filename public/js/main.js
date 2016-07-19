var ppBtn = $('#playPause');
var songName = $('#songTitle');
var nextSong = $('#nextSong');

var progress = $('#progress');
var pLoad = $('#pLoad');
var pPlay = $('#pPlay');

var volumeBar = $('#volumeBar');
var dropdownBtn = $('#dropdownBtn');
var dropdownIcon = $('#dropdownIcon');


var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#A8DBA8',
    progressColor: '#3B8686',
    barWidth: 3,
    height: 50,
});

wavesurfer.load('http://localhost:8080/http://api.soundcloud.com/tracks/269891192/stream?client_id=c2a1e9215e0e6f4dc03afe023ee9e212');
wavesurfer.on('ready', function () {
    wavesurfer.play();
});



var prevVolume;

$(document).ready(() => {
    $('.ui.dropdown').dropdown({
        on: 'hover',
        action: 'nothing',
        onChange: function(){}
    });

    progress.on('click', (e) => {
        var cords = e.pageX - $(progress).offset().left;
        var percent = (cords/progress.width())*100;
        Player.skipTo(percent);
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
    Player.onLoop = onLoop;
    Player.init();
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
    //console.log(buffered + '% buf', played +  '% play');
}

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

