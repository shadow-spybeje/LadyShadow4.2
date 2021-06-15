/**
 Utilites = {
     logger { print(), debug(), warn() },
     helpers { }
 };
 */
const Utilities = {};
module.exports = Utilities;

let bot;

/**
 * Initializes the Utilities framework.
 * @param {discordClient} bot discordClient
 * @returns Utilites.
 */
Utilities._Init = function(bot){
    bot = bot;
    delete this._Init;
    return this;
};

Utilities.logger = require("./logger.js");
Utilities.helpers = require("./helpers.js")._Init(bot);
