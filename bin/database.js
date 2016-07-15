var Song = require('./song');
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
            database.initSongs();
        }

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


database.initSongs = function() {
    this.songs.clear();
    this.songs.insert(new Song("never gonna give you up", ""));
    this.songs.insert(new Song("Adele - Hello", ""));
    this.songs.insert(new Song("Darude - Sandstorm", ""));
    this.songs.insert(new Song("Skrillex - Scary Monsters and Nice Sprites", ""));
    db.saveDatabase();
};

module.exports = database;

