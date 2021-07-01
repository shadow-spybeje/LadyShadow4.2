const Logger = {};
module.exports = Logger;

const log = function(txt){
    console.log(`\n${txt}`);
};

/**
 * Send an unformatted message to the Console.
 * @param {string} msg Message to print to console.
 */
Logger.emit = function(msg){
    console.log(`> ${msg}`);
};

/**
 * Send a message to the console.
 * @param {string} msg Message to print to console.
 */
Logger.print = function(msg){
    if(!msg) return;
    log(`> ${msg}`);
};

/**
 * Send a debug message to the console.
 * @param {string} msg Debug Message to print to console.
 */
Logger.debug = function(msg){
    if(!msg) return;
    log(`(DEBUG) ${msg}`);
};

/**
 * Send a warning message to the console.
 * @param {string} msg Warning Message to print to console.
 */
Logger.warn = function(msg){
    if(!msg) return;
    log(`(WARNING) ${msg}`);
};

/**
 * Send an error message to the console.
 * @param {string} msg Error Message to print to console.
 */
Logger.error = function(msg, error){
    if(!msg) return;
    log(`(ERROR) ${msg}`);
    if(error) console.error(error);
};
