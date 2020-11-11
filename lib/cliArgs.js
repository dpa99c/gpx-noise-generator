#!/usr/bin/env node

const cliArgs = (function(){

    /**********
     * Modules
     **********/
    const minimist = require('minimist');

    /**********************
     * Internal properties
     *********************/
    const cliArgs = {};

    /******************
     * Public properties
     *******************/
    cliArgs.args = minimist(process.argv.slice(2));

    cliArgs.isEmpty = function(){
        return !Object.keys(cliArgs.args).length;
    }

    return cliArgs;
})();

module.exports = function(){
    return cliArgs;
};
