module.exports = async function(bot){

    bot.config = {
        prefix:"..",

        support: {
            server: {
                guildStatus: "432290478780579845",
                blacklists: "417095515507785729",
            },
        },
    };

    bot.util = await require("./other/Utilities/_Utilities.js")._Init(bot);
    bot.functions = await require("./other/Functions/_Functions.js")._Init(bot);

    //#region Database
    dbCreds = require('../../.././tokens.json').db; //database credentials.
    bot.db = new require('../DataBase/main.js');
    await bot.db.init(
        [dbCreds.username, dbCreds.password],
        {database: "LilithShadow_2"})
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
    //#region External Modules
    bot.mods = {};

        //#region Phasmophobia (phasmo.js)
        try{
            bot.mods.phasmo = require("./other/phasmo")._Init();
            //console.log(bot.mods.phasmo.options)
            bot.util.logger.print("Module Ready: Phasmo.");
        }catch(e){ bot.util.logger.error("Module Error: Failed to Init 'Phasmo'."); };
        //#endregion

    //#endregion

    return bot;
};
