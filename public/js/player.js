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
        } else {
            self.text('Stop');
            self.prepend('<i class="stop icon"></i>');
            self.addClass('negative');
            self.removeClass('positive');
        }
    });


    var socket = io();

    socket.on('welcome', function(data) {
        socket.emit('i am client', {data: 'foo!', id: data.id});
    });
    socket.on('time', function(data) {
        addMessage(data.time);
    });
    socket.on('error', console.error.bind(console));
    socket.on('message', console.log.bind(console));

    function addMessage(message) {
        var text = document.createTextNode(message),
            el = document.createElement('li'),
            messages = document.getElementById('time');

        el.appendChild(text);
        messages.appendChild(el);
    }

});