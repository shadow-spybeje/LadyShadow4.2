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
    if(milSeconds.toString().length == 1){ milSeconds = `00${milSeconds}`; }
    else if(milSeconds.toString().length == 2){ milSeconds = `0${milSeconds}`; };

    result += `${year}/${month}/${day} ${hour}:${minute}:${seconds} (${milSeconds})`
    return result;
};

const _log = function(txt){
    console.log(`\n${txt}`);
};

const { DiscordAPIError } = require('discord.js');
const fs = require('fs');
const { msg } = require('../phasmo');

const validFiles = ['err', 'warn', 'log', 'debug'];
const filePrint = async function(data){

    if(data.file && !validFiles.includes(data.file)) return `${data.file} is not a supported file... Try these instead: ${validFiles.join(", ")}`;

    let timestamp = await timeStamp();
    if(
        data.msg.startsWith('Initialized the database')
        //data.msg.startsWith('')
        //data.msg.includes('')
    ) return; //don't want to log this..

    if(data.msg.includes('Client Ready.')) data.msg == 'Client Ready.'

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
    _log(`> ${msg}`);
    filePrint({msg:msg});
};

/**
 * Send a debug message to the console.
 * @param {string} msg Debug Message to print to console.
 */
Logger.debug = function(msg){
    if(!msg) return;
    _log(`(DEBUG) ${msg}`);
    filePrint({file: 'debug', msg:`(DEBUG) ${msg}\n${error}`});
};

/**
 * Send a warning message to the console.
 * @param {string} msg Warning Message to print to console.
 */
Logger.warn = function(msg){
    if(!msg) return;
    _log(`(WARNING) ${msg}`);
    filePrint({file: 'warn', msg:`(WARNING) ${msg}\n${error}`});
};

/**
 * Send an error message to the console.
 * @param {string} msg Error Message to print to console.
 */
Logger.error = function(msg, error){
    if(!msg) return;
    _log(`(ERROR) ${msg}`);
    if(error){
        console.error(error);
        filePrint({file: 'err', msg:`(ERROR) ${msg}\n${error.stack}`});
    }else{

        filePrint({file: 'err', msg:`(ERROR) ${msg}`});
    };
};


/**
 * Functions that log to files and console.
 */
global.log = {};


function badFile(data){
    let msg = `Aborted a logging > File: \`${data.file}\` Msg: ${data.mg}`;

    post({msg:msg, file:'warn'});
};

const files = ['log', 'err', 'warn', 'shdw', 'unlabled',
  'users', 'guilds', // Used for logging settings changes.
];
/**
 *
 * @param {object} data information to post
 * * <data.msg>: message to post.
 * * [data.file]: file to post in (defualt file: "unlabeled")
 * * * log
 * * * warn
 * * * err
 * * * shdw (say/sayd messages)
 */
async function post(data){
    if(!data || !data.msg) return; //Cannot log an empty message...
    if(!data.file) data.file = "unlabled";
    if(!files.includes(data.file)) return badFile(data);

    if(data.file == 'err' && data.err) data.msg = `${data.msg}\`\`\` ${data.err.stack}\`\`\``

    let timestamp = await timeStamp();
    let fileContent = `\n\n[${timestamp}]\n> ${data.msg}`;

    await fs.writeFile(`./source/logs/${data.file}.txt`, fileContent, { flag: 'a+' }, err => {
        if (err) {
          console.error(err)
          return err
        };
        return true; //file written successfully
    });

    // Check if the bot is in it's "Ready" state.
    if(!bot.readyAt) return;

    // Since we're "Ready", let's post this to our discord console.
    switch(data.file){ //Shadow Support / Shadow Management / console_${data.file}
        case('log'): ch='908164694517375007'; break;
        case('warn'): ch='908164721948123137'; break;
        case('err'): ch='908164746031812668'; break;
        case('unlabled'): ch='908164766546149466'; break;
        case('shdw'): ch='912472707898146877'; break;

        default: ch='908164766546149466';
    };
    if(!ch) return post({file:'warn', msg:`Discord Console was unable to find the channel for file \`${data.file}\``});

    let title = ''; // '(TITLE)'
    if(data.file != 'log' && data.file != 'unlabled'){
        _title = '';
        if(data.file == 'warn') _tittle = '(WARNING)';
            else if(data.file == 'err') _title = '(ERROR)';
        title = _title;
    };
    let msg = `${title} ${data.msg}`;

    bot.channels.cache.get(ch).send(msg);
};

let ignoredFiles = ['shdw', 'unlabled'];
log.print = function(msg, file){ if(!ignoredFiles.includes(file)) console.log(`\n`+msg);
    if(msg.startsWith('Client Ready.')) return;
    if(!file) return post({msg:msg, file:"log"});
    post({msg:msg, file:file});
};

log.warn = function(msg){ console.log(`\n(WARN) ` +msg); post({msg:msg, file:"warn"}); };

/**
 * @param {string} msg Message for the error
 * @param {string} error The error itself.
 */
log.error = function(msg, error){ console.log(`\n(ERROR) ` +msg+`\n  `+error.stack); post({msg:msg, err:error, file:"err"}); };
