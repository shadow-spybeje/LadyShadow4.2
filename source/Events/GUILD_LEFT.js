module.exports = async (bot, guild) => {
    let msg = `Left Guild: \`(${guild.id}) ${guild.name}\``;

    if(!guild.isEmit){ bot.util.logger.print(msg);
    }else{ bot.util.logger.emit(msg); };

    let ch = bot.channels.cache.get(bot.config.support.server.guildStatus);
    if(!ch) return bot.util.logger.warn(`Client does not have access to the SupportGuldJoinChannel!`)

    let result, data;
    try{
        await bot.db.get("Guilds", {id:guild.id}).then(r => result = r[0]);
    }catch(err){
        console.log(err);
    };
    if(result){
        data = result;
        data.active = false;
        console.log(data)

        try{
            await bot.db.edit("Guilds", {id:guild.id}, data);
        }catch(err){
            bot.send('guildStatus', `There was an error slicing guild ${guild.id}`);
        };
    };

    bot.send('guildStatus', msg);
};
