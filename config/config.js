var config = {};


config.debug = true;
config.web = {};
config.soundcloud = {};

config.web.port = process.env.PORT || '3000';

config.soundcloud.clientID = 'c2a1e9215e0e6f4dc03afe023ee9e212';

module.exports = config;