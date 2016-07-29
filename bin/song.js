var utils = require('./utils');
var config = require('../config/config');

//class Song{
//    constructor(name, url, tags = []){
//        this.name = name;
//        this.url = url;
//        this.tags = tags;
//        this.id = utils.getGuid();
//    }
//}

function Song(id, title, description, duration, tags, artwork, url){
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.tags = tags;
    this.artwork = artwork;
    this.url = url;
}

Song.prototype.mapFromJSON = function(json){
    this.id = json.id.toString();
    this.title = json.title;
    this.description = json.description;
    this.duration = msToTime(json.duration);
    this.tags = json.tag_list;
    this.artwork = json.artwork_url;
    this.url = config.web.hostname + '/tracks?id=' + json.id;
};

function msToTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports = Song;