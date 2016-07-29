var Song = require('./song');
var utils = require('./utils');
var config = require('../config/config');
var loki = require('lokijs');
db = new loki('data/data.json');

var database = {};
database.ready = false;
database.loading = false;

database.init = function(){
    db.loadDatabase({}, function(){
        database.loading = true;
        var songs = db.getCollection('songs');

        if(!songs){
            songs = db.addCollection('songs');
            initSongs(songs);
        }

        if(config.debug == true) {initSongs(songs);}

        database.songs = songs;
        database.ready = true;
        database.loading = false;
    });
};

//write methods

database.addSong = function(song){
    if(!(song instanceof Song)) return; //TODO: Error catching (db not ready etc)
    this.songs.insert(song);
};

database.updateSong = function(song){
    this.songs.update(song);
};

database.deleteSong = function(song){
    this.songs.remove(song);
};

database.deleteSongById = function(id){
    var song = this.songs.findOne({id: id});
    utils.log(song.title);
    this.songs.remove(song);
};

database.getAllSongs = function(){
    return this.songs.data;
};

//read methods

database.findSongs = function(name, tags){
    var res = this.songs.find({name: name, tags: tags});
};


var initSongs = function(songs) {
    songs.clear();
    songs.insert(new Song('269891192', "Miss Bass & Rusty K - Palm Shot (Edit)1", "A new collaboration with Miss Baas (Steisha)!!!", "#:##",  "\"Drum & Bass\" \"Rusty K\" \"Miss Baas\" 2016 Vocal Reggae", "https://i1.sndcdn.com/artworks-000168163663-30oe8g-large.jpg",config.web.hostname + '/tracks?id=269891192'));
    songs.insert(new Song('208234490', "The Pixies - Where Is My Mind (Rusty K Bootleg)1", "My cover version of The Pixies - Where Is My Mind that full of sun and love","#:##", "Bootleg Where Is My Mind 2015 Drum&amp;Bass Rusty Neurofunk Summer Cover Free Download", "https://i1.sndcdn.com/artworks-000118773678-sshxqh-large.jpg",config.web.hostname + '/tracks?id=208234490'));
    songs.insert(new Song('215392816', "Rusty K - End War", "", "#:##", "", "https://i1.sndcdn.com/artworks-000123707155-qy5r4k-large.jpg",config.web.hostname + '/tracks?id=215392816'));db.saveDatabase();
};

utils.log('Database initialised!');
module.exports = database;

