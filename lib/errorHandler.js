#!/usr/bin/env node

const errorHandler = (function(){

    /**********
     * Modules
     **********/

    // lib
    const logger = require('./logger.js')();
    const cliArgs = require('./cliArgs.js')().args;

    /**********************
     * Internal properties
     *********************/
    const errorHandler = {};

     /************
     * Public API
     ************/
     errorHandler.handleFatalException = function(e, _msg){
         let msg = "FATAL EXCEPTION: ";
         if(_msg) msg += _msg + "; ";
         msg += (typeof e === 'object' ? e.message : e);
         logger ? logger.error(msg) : console.error(msg);
         if(cliArgs['debug']){
             logger.dump(e);
         }
         process.exit(1); // exit on fatal error
     };

    errorHandler.handleFatalError = function(msg){
        msg = "FATAL ERROR: " + msg;
        logger ? logger.error(msg) : console.error(msg);
        process.exit(1); // exit on fatal error
    };
    
    return errorHandler;
})();

module.exports = function(){
    return errorHandler;
};
