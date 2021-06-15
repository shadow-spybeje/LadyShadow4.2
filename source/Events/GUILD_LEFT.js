module.exports = (bot, guild) => {
    let msg = `Left Guild: \`(${guild.id}) ${guild.name}\``;

    if(!guild.isEmit){ bot.util.logger.print(msg);
    }else{ bot.util.logger.emit(msg); };

    let ch_ID = "417093499167440896";
    let ch = bot.channels.cache.get(ch_ID);
    if(!ch) return bot.util.logger.warn(`Client does not have access to the SupportGuldLeaveChannel!`)

    ch.send(msg);
};
