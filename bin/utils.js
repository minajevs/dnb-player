var app = require('../app');
var config = require('../config/config');

var utils = {};

utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

utils.getGuid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
};

utils.takeRandom = function(arr, count){
    if(count >= arr.length) return arr;
    var indexes = [],
        max = arr.length-1;
    while(indexes.length != count){;
        var num = utils.getRandomInt(0, max);
        if(indexes.indexOf(num) == -1)
            indexes.push(num);
    }
    var res = indexes.map((index) => {return arr[index]});
    return res;
};

utils.log = function(){
    if(config.debug === true){
        for(var i = 0; i < arguments.length; i++){
            var arg = arguments[i];
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function(_, stack) {
                return stack;
            };
            var err = new Error;
            Error.captureStackTrace(err, arg);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            console.log('\u001b[32m[DEBUG]\u001b[39m\u001b[33m[' + stack[1].getFileName().split(/[\\/]/).pop() + ']\u001b[39m ' + arg);
        }
    }
};

module.exports = utils;