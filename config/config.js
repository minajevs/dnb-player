var config = {};


config.debug = false;
config.web = {};
config.soundcloud = {};

config.web.port = process.env.PORT || '3000';
config.web.hostname = config.debug ? '//localhost:' + config.web.port : '//dnb.dexie.me';

config.soundcloud.clientID = 'c2a1e9215e0e6f4dc03afe023ee9e212';

module.exports = config;