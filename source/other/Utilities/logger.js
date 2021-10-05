const Logger = {};
module.exports = Logger;


const timeStamp = async function(){
    var result="";
    var d = new Date();

    let year = d.getFullYear();
    let month = d.getMonth()+1; if(month.toString().length == 1) month = `0${month}`;
    let day = d.getDate(); if(day.toString().length == 1) day = `0${day}`;
    let hour = d.getHours(); if(hour.toString().length == 1) hour = `0${hour}`;
    let minute = d.getMinutes(); if(minute.toString().length == 1) minute = `0${minute}`;
    let seconds = d.getSeconds(); if(seconds.toString().length == 1) seconds = `0${seconds}`;
    let milSeconds = d.getMilliseconds();
    if(milSeconds.toString().length == 1){ milSeconds = `00${"milSeconds"}`; }
    else if(milSeconds.toString().length == 2){ milSeconds = `0${milSeconds}`; };

    result += `${year}/${month}/${day} ${hour}:${minute}:${seconds} (${milSeconds})`
    return result;
};

const log = function(txt){
    console.log(`\n${txt}`);
};

const fs = require('fs')

const validFiles = ['err', 'warn', 'log', 'debug'];
const filePrint = async function(data){

    if(data.file && !validFiles.includes(data.file)) return `${data.file} is not a supported file... Try these instead: ${validFiles.join(", ")}`;

    let timestamp = await timeStamp();
    let fileContent = `\n\n[${timestamp}]\n> ${data.msg}`;

    if(data.file) fs.writeFile(`./source/logs/${data.file}.txt`, fileContent, { flag: 'a+' }, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
    });

    fs.writeFile(`./source/logs/log.txt`, fileContent, { flag: 'a+' }, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
    });
};

/**
 * Send an unformatted message to the Console.
 * @param {string} msg Message to print to console.
 */
Logger.emit = function(msg){
    console.log(`> ${msg}`);

    filePrint({msg:msg});
};

/**
 * Send a message to the console.
 * @param {string} msg Message to print to console.
 */
Logger.print = function(msg){
    if(!msg) return;
    log(`> ${msg}`);
    filePrint({msg:msg});
};

/**
 * Send a debug message to the console.
 * @param {string} msg Debug Message to print to console.
 */
Logger.debug = function(msg){
    if(!msg) return;
    log(`(DEBUG) ${msg}`);
    filePrint({file: 'debug', msg:`(DEBUG) ${msg}\n${error}`});
};

/**
 * Send a warning message to the console.
 * @param {string} msg Warning Message to print to console.
 */
Logger.warn = function(msg){
    if(!msg) return;
    log(`(WARNING) ${msg}`);
    filePrint({file: 'warn', msg:`(WARNING) ${msg}\n${error}`});
};

/**
 * Send an error message to the console.
 * @param {string} msg Error Message to print to console.
 */
Logger.error = function(msg, error){
    if(!msg) return;
    log(`(ERROR) ${msg}`);
    if(error){
        console.error(error);
        filePrint({file: 'err', msg:`(ERROR) ${msg}\n${error.stack}`});
    }else{

        filePrint({file: 'err', msg:`(ERROR) ${msg}`});
    };
};
