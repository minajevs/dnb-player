$(document).ready(() => {
    var playing = false;
    var ppBtn = $('#playPause');
    ppBtn.on('click', () => {
        playing = !playing;
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
    });

    var onPlayClick = function(){
        socket.emit('getRandomSong');
    };

    var onStopClick = function(){

    };


    var socket = io();

    socket.on('welcome', function(data) {
        socket.emit('i am client', {data: 'connection from web', id: data.id});
    });
    socket.on('time', function(data) {
        addMessage(data.time);
    });

    socket.on('song', function(data) {
        setSong(data);
    });
    socket.on('error', console.error.bind(console));
    socket.on('message', console.log.bind(console));

    function setSong(song){
        $('#songTitle').text(song.name);
    }

    function addMessage(message) {
        var text = document.createTextNode(message),
            el = document.createElement('li'),
            messages = document.getElementById('time');

        el.appendChild(text);
        messages.appendChild(el);
    }

});