var app = require('../app');
var config = require('../config/config');

Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});
Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, '__function', {
    get: function() {
        return __stack[1].getFunctionName();
    }
});

Object.defineProperty(global, '__filename', {
    get: function() {
        return __stack[1].getFileName();
    }
});

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

utils.log = function(){
    if(config.debug === true){
        for(let i = 0; i < arguments.length; i++){
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