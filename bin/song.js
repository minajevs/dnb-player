class Song{
    constructor(name, url, tags = []){
        this.name = name;
        this.url = url;
        this.tags = tags;
    }
}

module.exports = Song;