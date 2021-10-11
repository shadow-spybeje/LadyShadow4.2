module.exports = async (guild) => {
    const bot = guild.client;

    let ch = bot.channels.cache.get(bot.config.support.server.guildStatus);
    if(!ch) return bot.util.logger.warn(`Client does not have access to the SupportGuldJoinChannel!`)

    if(await bot.db2.Guilds_hasGuild(guild.id)) await bot.db2.Guilds_updateStatus(guild.id, false);

    let embed = new bot.util.helpers.Embed().GuildLeft(guild);

    bot.send('guildStatus', embed);
};
