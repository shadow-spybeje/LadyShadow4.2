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
 * @param {discordClient} _bot discordClient
 * @returns Utilites.
 */
Utilities._Init = function(_bot){
    bot = _bot;
    delete this._Init;


    Utilities.logger = require("./logger.js");
    Utilities.helpers = require("./helpers.js")._Init(bot);

    return this;
};
