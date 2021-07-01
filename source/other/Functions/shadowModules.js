const ShadowModules = {};
module.exports = ShadowModules;

let bot;

/**
 * Modules: {
 *  phasmo
 * }
 */
let mods;

ShadowModules._Init = function(_bot){
    bot = _bot;
    delete this._Init;
    return this;
};

/**
 * Check the shadow modules for valid atributes for firing a module.
 * * ⚠ A valid module will overwrite command usage! ⚠
 * @param {object} message the message object presented by discord's "Message" event.
 */
ShadowModules.checkForValidModules = async function(message){
    if(!bot) return bot = message.client;
    if(!mods) mods = bot.mods;

    if(message.content.startsWith(mods.phasmo.options.prefix)){
        return mods.phasmo.msg({channel:message.channel, msg:message.content});
    };
};
