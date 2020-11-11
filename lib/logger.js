#!/usr/bin/env node

const logger = (function(){

    /**********
     * Modules
     **********/

    //lib
    const cliArgs = require('./cliArgs.js')().args;

    /**********************
     * Internal properties
     *********************/
    let logger, hasColors = true;

    // 3rd party modules
    try{
        require('colors');
    }catch(e){
        hasColors = false;
    }

    /**********************
     * Internal functions
     *********************/

    /************
     * Public API
     ************/
    logger = {
        dump: function (obj, title){
            title = title || "DUMP";
            console.log(title + ": " + logger.getDump(obj));
        },
        getDump: function(obj){
            return require('util').inspect(obj);
        },
        debug: function(msg){
            if(cliArgs["debug"]) {
                msg = "DEBUG: " + msg;
                if(hasColors){
                    console.log(msg.magenta);
                }else{
                    console.log(msg);
                }
            }
        },
        verbose: function(msg){
            if(cliArgs["verbose"] || cliArgs["debug"]) {
                if(hasColors){
                    console.log(msg.green);
                }else{
                    console.log(msg);
                }
            }
        },
        log: function(msg){
            console.log(msg); // use default system colour
        },
        info: function(msg){
            if(hasColors){
                console.log(msg.blue);
            }else{
                console.info(msg);
            }
        },
        warn: function(msg){
            if(hasColors){
                console.log(msg.yellow);
            }else{
                console.warn(msg);
            }
        },
        error: function(msg){
            if(hasColors){
                console.log(msg.red);
            }else{
                console.error(msg);
            }
        }
    };
    return logger;
})();

module.exports = function(){
    return logger;
};
