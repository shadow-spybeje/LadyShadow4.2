module.exports = (bot, guild) => {
    let msg = `Joined Guild: \`(${guild.id})\` ${guild.name}`;

    bot.util.logger.print(msg);
    let ch_ID = "417093499167440896";
    let ch = bot.channels.cache.get(ch_ID);
    if(!ch) return bot.util.logger.warn(`Client does not have access to the SupportGuldJoinChannel!`)

    ch.send(msg);
};
