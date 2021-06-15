const Logger = {};
module.exports = Logger;

/**
 * Send a message to the console.
 * @param {string} msg Message to print to console.
 */
Logger.print = function(msg){
    if(!msg) return;
    console.log(`> ${msg}`);
};

/**
 * Send a debug message to the console.
 * @param {string} msg Debug Message to print to console.
 */
Logger.debug = function(msg){
    if(!msg) return;
    console.log(`(DEBUG) ${msg}`);
};

/**
 * Send a warning message to the console.
 * @param {string} msg Warning Message to print to console.
 */
Logger.warn = function(msg){
    if(!msg) return;
    console.log(`(WARNING) ${msg}`);
};

/**
 * Send an error message to the console.
 * @param {string} msg Error Message to print to console.
 */
 Logger.error = function(msg, error){
    if(!msg) return;
    console.log(`(ERROR) ${msg}`);
    if(error) console.error(error);
};
