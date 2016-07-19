var Song = require('./song');
var utils = require('./utils');
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

        initSongs(songs);

        database.songs = songs;
        database.ready = true;
        database.loading = false;
    });
};

//write methods

database.addSong = function(song){
    if(!(song instanceof Song)) return; //TODO: Error catching (db not ready etc)
    this.songs.insert(song);
    db.saveDatabase();
};

database.updateSong = function(song){
    if(!(song instanceof Song)) return; //TODO: Error catching (db not ready etc)
    this.songs.update(song);
    db.saveDatabase();
};

database.deleteSong = function(song){
    if(!(song instanceof Song)) return; //TODO: Error catching (db not ready etc)
    this.songs.remove(song);
    db.saveDatabase();
};

//read methods

database.findSongs = function(name, tags){
    var res = this.songs.find({name: name, tags: tags});
};


var initSongs = function(songs) {
    songs.clear();
    songs.insert(new Song("Noisia - Dustup", "https://github.com/minajevs/dnb-player/raw/master/Noisia_amp_The_Upbeats-Dust_Up.mp3"));
    songs.insert(new Song("Evolcast 009", "https://onedrive.live.com/download?cid=25E5200581EF8F85&resid=25E5200581EF8F85%216546&authkey=AKgE2C_bwRbxckE"));
    db.saveDatabase();
};

utils.log('Database initialised!');
module.exports = database;

