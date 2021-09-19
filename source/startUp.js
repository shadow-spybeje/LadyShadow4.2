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


    bot.cmds = await require('./Commands/_index.js')(); //Load our Commands.
    bot.locale = await require('./Localisation/_index.js')(bot); //Load our Localisations.
    bot.l = function(msg, key){
        const bot = msg.client;
        let lang = bot.Users[msg.author.id].lang;
        let results;

        if(!bot.locale[lang]){
            bot.util.helpers.sendTo("console", `Langauge code: __\`${lang}\`__ not found in the Locales...`);
            lang = "en";
        };

        if(!bot.locale[lang][key]){
            if(typeof bot.locale[lang][key] == "boolean"){
                lang = 'en';
            }else{
                bot.util.helpers.sendTo("console", `Language key: __\`${key}\`__ in the __\`${lang}\`__ lang code was not found..`);
                lang = "en";
            };
        };

        if(!bot.locale['en'][key]){
            results = key;
        }else{
            results = bot.locale[lang][key];
        };

        return results;
    ;}


    /**
     * External Modifications to the bot.
     * Usually executed before a prefix check. (Mostly by an internal prefic of its own!)
     */
    //#region External Modules

    console.log(`\n>>> Loading Modules <<<`);
    bot.mods = {};

        //#region Phasmophobia (phasmo.js)
        try{
            bot.mods.phasmo = require("./other/phasmo")._Init();
            //console.log(bot.mods.phasmo.options)
            console.log("> Module Ready: Phasmo.");
        }catch(e){ bot.util.logger.error("Module Error: Failed to Init 'Phasmo'."); };
        //#endregion

    //#endregion


    bot.Users = new Map();
    bot.Guilds = new Map();
    bot.db.get("Users", {}).then(results => {
        for(let x = 0; x < results.length; x++){
            let y = results[x];
            bot.Users[y.id] = y;
        };
    }).catch(err => { bot.util.logger.error(`Error loading User Data from the DataBase:\n`, err); });

    bot.db.get("Guilds", {}).then(results => {
        for(let x = 0; x < results.length; x++){
            let y = results[x];
            bot.Guilds[y.id] = y;
        };
    }).catch(err => { bot.util.logger.error(`Error loading Guild Data from the DataBase:\n`, err); });


    return bot;
};
