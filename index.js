#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const parser = require('xml-js');

const cliArgs = require('./lib/cliArgs.js')();
const args = cliArgs.args;
const logger = require('./lib/logger.js')();
const errorHandler = require('./lib/errorHandler.js')();

const DEFAULTS = {
    probability: 100,
    max: 1,
    min: 0
};


function parseXmlFileToJson(filepath, parseOpts){
    parseOpts = parseOpts || {compact: true};
    return JSON.parse(parser.xml2json(fs.readFileSync(path.resolve(filepath), 'utf-8'), parseOpts));
}

function writeJsonToXmlFile(jsonObj, filepath, parseOpts){
    parseOpts = parseOpts || {compact: true, spaces: 4};
    const xmlStr = parser.json2xml(JSON.stringify(jsonObj), parseOpts);
    fs.writeFileSync(path.resolve(filepath), xmlStr);
}

function version(){
    const packageJson = require('./package.json');
    return logger.log(`${packageJson.name}@${packageJson.version}`);
}

function help(){
    const helpText = fs.readFileSync(path.resolve(__dirname, 'usage.txt'), 'utf-8');
    logger.log(helpText);
}

function ensureArray(obj){
    return (typeof obj !== 'object' || typeof obj.length === 'undefined') ? [obj] : obj;
}

function isProbable(percentage) {
    const n = percentage/100;
    return !!n && Math.random() <= n;
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function applyRandom(value){
    const min = args["min"] || DEFAULTS.min;
    const max = args["max"] || DEFAULTS.max;

    let offset = randomNumber(min, max);
    offset = isProbable(50) ? -offset : offset;
    return value+offset;
}

function applyToPoints(points){
    ensureArray(points).forEach(_point => {
        if(!_point._attributes.lat || !_point._attributes.lon) return logger.warn("lat/lon missing from point: "+JSON.stringify(_point));

        let lat = parseFloat(_point._attributes.lat);
        let lon = parseFloat(_point._attributes.lon);

        const probability = args["probability"] || DEFAULTS.probability;
        if(!isProbable(probability)) return logger.debug("omitting noise for point as inprobable choice :"+JSON.stringify(_point));

        _point._attributes.lat = applyRandom(lat);
        _point._attributes.lon = applyRandom(lon);
    });
}

function applyToRoute(rte){
    ensureArray(rte).forEach(_rte => {
        applyToPoints(_rte.rtept);
    });
}

function applyToTrack(trk){
    ensureArray(trk).forEach(_trk => {
        ensureArray(_trk.trkseg).forEach(_trkseg => {
            applyToPoints(_trkseg.trkpt);
        });
    });
}

function run(){
    if(args["v"] || args["version"]){
        return version();
    }

    if(cliArgs.isEmpty() || args["h"] || args["help"]){
        return help();
    }

    const inputFilePath = args["input"] || args["i"]
    if(!inputFilePath) throw "Input GPX file not specified - use -i or --input argument to specify";

    const outputFilePath = args["output"] || args["o"] || inputFilePath+".noisy";

    try{
        const gpx = parseXmlFileToJson(inputFilePath);
        const root = gpx.gpx;
        if(root.wpt){
            applyToPoints(root.wpt);
        }

        if(root.rte){
            applyToRoute(root.rte);
        }

        if(root.trk){
            applyToTrack(root.trk);
        }

        writeJsonToXmlFile(gpx, outputFilePath);
    }catch(e){
        throw "Input file doesn't exist or contains invalid XML: " + e.message;
    }


}
try{
    run();
}catch(e){
    errorHandler.handleFatalException(e);
}
