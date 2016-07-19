var utils = require('./utils');

//class Song{
//    constructor(name, url, tags = []){
//        this.name = name;
//        this.url = url;
//        this.tags = tags;
//        this.id = utils.getGuid();
//    }
//}

function Song(name, url, tags){
    this.name = name;
    this.url = url;
    this.tags = tags;
    this.id = utils.getGuid();
}

module.exports = Song;