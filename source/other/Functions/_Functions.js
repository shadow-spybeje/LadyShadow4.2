/**
Functions = {

};
*/
const Functions = {};
module.exports = Functions;

let bot;

/**
 * Initializes the Functions framework.
 * @param {discordClient} _bot discordClient
 * @returns Functions.
 */
Functions._Init = function(_bot){
    bot = _bot;
    delete this._Init;

    Functions.ShadowModules = require("./shadowModules.js")._Init(bot);

    bot.send = Functions.send;

    return this;
};

/**
 * Send data to a specific support channel
 * @param {string} channel Support channel to send the {content}
 * * 'guildStatus'
 * * 'blacklists'
 * @param {string | object} content content to send.
 */
Functions.send = async function(channel, content){
    let id;

    switch(channel){
        case('guildStatus'): id = bot.config.support.server['guildStatus']; break;
        case('blacklists'): id = bot.config.support.server['blacklists']; break;
        default: return;
    };

    let ch = await bot.channels.cache.get(id);
    if(!ch) return bot.util.logger.warn(`No Support channel found ${channel}!`);

    ch.send(content);
};
