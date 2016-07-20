var utils = require('./utils');

//class Song{
//    constructor(name, url, tags = []){
//        this.name = name;
//        this.url = url;
//        this.tags = tags;
//        this.id = utils.getGuid();
//    }
//}

function Song(id, title, description, tags, artwork, url){
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.artwork = artwork;
    this.url = url;
}

Song.mapFromJSON = function(json){
    return new Song(json.id, json.title, json.description, json.tag_list, json.artwork_url,
        'http://localhost:3000/tracks?id='+json.id);
};

module.exports = Song;