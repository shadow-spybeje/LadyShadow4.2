const links = [
    "http:",
    "https:",
    "www.",
    ".com",
    ".io",
    "discordn", //BLACKLIST THIS SITE!!!
];

module.exports = async (message) => {

    const bot = message.client;

    //await message.client.createChatLog(message, 0);

    if(message.webhook){
        bot.stats.read.webhoook++;
        if(!bot.stats.read.x.W.includes(message.author.id)) bot.stats.read.x.W.push(message.author.id);
        return
    }else if(message.author.bot){
        if(message.author.id == "378974861046841344") return;
        bot.stats.read.bot++;
        if(!bot.stats.read.x.B.includes(message.author.id)) bot.stats.read.x.B.push(message.author.id);
        return
    }else{
        bot.stats.read.human++;
        if(!bot.stats.read.x.H.includes(message.author.id)) bot.stats.read.x.H.push(message.author.id);
    };
    //if(message.author.id != "213250789823610880") return;

    let wasModule = await message.client.functions['ShadowModules'].checkForValidModules(message);
    if(wasModule) return bot.stats.mods++;

    /**
     * add to modules
     */
    if(
        message.channel.type == "dm" &&
        message.author.id == "775247639083614218"
        //bot.config.spamWatchIDs.includes(message.author.id)
    ){
        for(x=0; x < links.length;x++){
            if(message.content.includes(links[x])){
                let g = await bot.guilds.cache.get("416906584900239370");
                g.members.fetch(message.author.id)
                .then(member => {
                    member.ban({reason: "Detected a link in DM's, executing ad prevention!"})
                    .then(() => {
                        g.channels.cache.get("417173776220815362").send(`Detected a link in DM's from ${message.author.tag} (${message.author.id}), executing ad-prevention!`);
                    })
                })
                .catch(err => { bot.util.logger.error(err) });
            };
        };
    };

    let prefix = '..';
    //#region Get Possible prefixes; check for validity; return if false;
    let gprefix = await bot.db2.Guilds_getGuild(message.guild.id).then(r => {
        if(!r) return null;
        return r.config.prefix;
    });
    let pprefix = await bot.db2.Users_getUser(message.author.id).then(r => {
        if(!r) return null;
        return r.prefix;
    });

    let ctx = message.content;
    if(ctx.startsWith(gprefix)){
        prefix = gprefix;
    }else if(ctx.startsWith(pprefix)){
        prefix = pprefix;
    }else if(ctx.startsWith('..')){
        prefix = '..'
    }else{
        return;
    };

    //#endregion

    let blacklist = await bot.db2.getBlacklist();
    if(blacklist[message.author.id]) return message.react('❌');

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmdName = args.shift();

    let Cmd = bot.cmds.get(cmdName) || bot.cmds.find(c => c.aliases && c.aliases.includes(cmdName));

    try{
        //Check our general commands for {cmdName}
        if(!Cmd) return;


        if(!await bot.db2.Users_hasUser(message.author.id)) await bot.db2.Users_createUser(message.author);
        if(!bot.Users[message.author.id]) bot.Users[message.author.id] = await bot.db2.Users_getUser(message.author.id);


        /*if(!bot.Users[message.author.id]){
            let data = {
                id: message.author.id,
                prefix: bot.config.prefix,
                lang: 'en',
                todo: {}
            };
            bot.Users[message.author.id] = data;
            bot.db.post("Users", data).catch(err => bot.util.logger.error(`Error occured while posting user data:\n`, err))
        };

        // Since we have a command we need to be sure to set the users' language.
        // We need to check the database for an existing language, otherwise use en/us.
        if(!bot.Users[message.author.id].locale) bot.db.get("Users", {id:message.author.id}, {_id:0, id:1, lang:1})
        .then(results => {
            if(results.length != 0 && results[0].lang != null){
                bot.Users[message.author.id].lang = results[0].lang;
            }else{ //We don't have a file for this user.
                bot.db.edit("Users", {id:message.author.id}, {"lang": "en"})
                .catch(err => bot.util.logger.error(`Error occured while editing user data:\n`, err));
                bot.Users[message.author.id].lang = 'en'
            };
        });*/


        if(Cmd.Access){
            if(Cmd.Access == 'Dev' &&
                (// start ID Check
                    message.author.id != '213250789823610880' && //Spy
                    message.author.id != '295404527308242944' //Beje
                ) //End ID Check
            ) return message.react('❌');
        }; //Cmd.Access

        if(Cmd.args && args.length == 0 && !Cmd.EasterEgg){
            return message.channel.send(
                `${await message.client.l(message, `$cmd_usage`)}`+
                `\`${await message.client.l(message, `$cmd_${Cmd.name}_name`)} `+
                `${await message.client.l(message, `$cmd_${Cmd.name}_usage`).replace(/{cmdName}/g, Cmd.name)}\``
            );
        };

        bot.stats.c++;
        Cmd.Execute(message, args);

    }catch(err){
        console.error(`Error executing command: ${Cmd}\n`, err);
    };
};
