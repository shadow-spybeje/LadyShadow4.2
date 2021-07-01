module.exports = async (bot, guild) => {
    let msg = `Joined Guild: \`(${guild.id}) ${guild.name}\``;

    if(!guild.isEmit){ bot.util.logger.print(msg);
    }else{ bot.util.logger.emit(msg); };

    let ch = bot.channels.cache.get(bot.config.support.server.guildStatus);
    if(!ch) return bot.util.logger.warn(`Client does not have access to the SupportGuldJoinChannel!`)

    let result, data, err;
    try{
        await bot.db.get("Guilds", {id:guild.id}).then(r => result = r[0]);
    }catch(err){
        console.log(err);
    };
    if(result){
        console.log('has a resullt')
        data = result;
        data['active'] = true;
        console.log(data)
    }else{
        console.log('ELSE')
        data = {
            id: guild.id,
            active: true,
            config: {
                prefix:bot.config.prefix,
            },
            channels: {
                welcome: "",
                farewell: "",
                log_mod: "",
                log_chat:"",
                log_user: "",
                rift: "",
            },
            roles:{
                staff: "",
                admin: "",
                moderator: "",
                mute: "",
                welcome: "",
            },
            blacklist: [
                {id:"", time:"", reason:""}
            ],
        };
    };

    try{
        await bot.db.edit("Guilds", {id:guild.id}, data);
    }catch(err){
        err = true;
    };

    bot.send('guildStatus', msg);
    if(err) bot.send('guildStatus', `There was an error posting guild ${guild.id}`);
};
