module.exports = async function(bot){

    bot.util = require("./other/Utilities/_Utilities.js")._Init(bot);

    //#region Database
    dbCreds = require('../../.././tokens.json').db; //database credentials.
    bot.db = await require("../DataBase/main").init(
        [dbCreds.username, dbCreds.password],
        {database: "LilithShadow"})
        .then(op => {
            bot.util.logger.print(`Initialized the database with the options: ${JSON.stringify(op)}`);
            dbCreds = undefined; //Clear the credentials.
        })
        .catch(err => {
            dbCreds = undefined; //Clear the credentials.
            return bot.util.logger.warn(err);
        });
    //#endregion


    /**
     * External Modifications to the bot.
     * Usually executed before a prefix check. (Mostly by an internal prefic of its own!)
     */
    bot.mods = {};
    //#region External Modules

        //#region Phasmophobia (phasmo.js)
        try{
            bot.mods.phasmo = require("./other/phasmo")._Init();
            bot.util.logger.print("Module Ready: Phasmo.");
        }catch(e){ bot.util.logger.error("Module Error: Failed to Init 'Phasmo'."); };
        //#endregion

    //#endregion

    return bot;
};
