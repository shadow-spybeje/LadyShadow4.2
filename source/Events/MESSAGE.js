module.exports = async (message) => {

    const bot = message.client;

    if(message.author.bot){
        bot.stats.read.bot++;
        if(!bot.stats.read.x.B.includes(message.author.id)) bot.stats.read.x.B.push(message.author.id);
        return
    }else{
        bot.stats.read.human++;
        if(!bot.stats.read.x.H.includes(message.author.id)) bot.stats.read.x.H.push(message.author.id);
    };
    //if(message.author.id != "213250789823610880") return;

    let wasModule = await message.client.functions['ShadowModules'].checkForValidModules(message);
    if(wasModule) return stats.mods++;

    let p = "..";
    if(!message.content.startsWith(p)) return;
    let args = message.content.slice(p.length).trim().split(/ +/g);
    let cmdName = args.shift();

    let Cmd = bot.cmds.get(cmdName) || bot.cmds.find(c => c.aliases && c.aliases.includes(cmdName));

    try{
        //Check our general commands for {cmdName}
        if(!Cmd) return;



        if(!bot.Users[message.author.id]){
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
        if(!bot.Users[message.author.id].lang) bot.db.get("Users", {id:message.author.id}, {_id:0, id:1, lang:1})
        .then(results => {
            if(results.length != 0 && results[0].lang != null){
                bot.Users[message.author.id].lang = results[0].lang;
            }else{ //We don't have a file for this user.
                bot.db.edit("Users", {id:message.author.id}, {"lang": "en"})
                .catch(err => bot.util.logger.error(`Error occured while editing user data:\n`, err));
                bot.Users[message.author.id].lang = 'en'
            };
        });


        if(Cmd.Access){
            if(Cmd.Access == 'Dev' && message.author.id != '213250789823610880') return message.react('❌');
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
