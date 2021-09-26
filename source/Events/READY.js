const emitEvents = [];

const Events = {
    "ready": {
        isEmit: true
    },
    "guildCreate": {
        isEmit: true,
        id:"0001",
        name:"EmitEvent 'guildCreate' (GUILD_JOINED)"
    },
    "guildDelete": {
        isEmit: true,
        id:"0001",
        name:"EmitEvent 'guildDelete' (GUILD_LEFT)"
    },
};

module.exports = async (bot) => {

    if(bot.isEmit){ //This is an Emit;
        bot.util.logger.emit(`Client Ready.\n> • DiscordClient#0000 (0000)`);


        bot.isEmit = false;
        return;
    };

    await bot.user.setPresence({
        status: "idle",
        _activity: {
            type: "STREAMING",
            name: `the Beta Version. | ${bot.config.prefix}help`,
            url: "https://www.twitch.tv/scion_spy"
        },
        activity: {
            type: "WATCHING",
            name: `${bot.config.prefix}help | v.${bot.config.version}`,
        }
    });

    let p = bot.user.presence;
    let a = p.activities[0];
    bot.util.logger.print(`Client Ready.\n> • ${bot.user.tag} (${bot.user.id}) | (${p.status}) "${a.type}: ${a.name}"`);

    emitEvents.forEach(async (event) => {
        bot.util.logger.print(`Emit Event: ${event}`);
        if(event == "ready"){
            bot.isEmit = true;
            return await bot.emit(event, bot);
       };
        await bot.emit(event, Events[event]);
    });

    //#region Eval Restart ('eval k()') checker, notify complete if was an eval restart.
    bot.db.get("_Config", {}, {_id:0})
        .then(res => {

            r = res[0];
            if(r.evalRestart.messageID != 0){
                bot.db.edit("_Config", {}, {"evalRestart": {"channelID":0,"messageID":0,"Timestamp":0}})
                    .then()
                    .catch(err => bot.util.logger.error(`There was an error resetting evalRestart params:\n`, err));

                bot.channels.cache.get(r.evalRestart.channelID).messages.fetch(r.evalRestart.messageID).then(msg => {
                    let ms = Date.now() - r.evalRestart.Timestamp;
                    msg.edit(`Restart Complete!\nTook: \`${ms}ms\``)
                })
            };
        })
        .catch(err => {
            bot.util.logger.error(`There was an error requesting '_Config' file data:\n`, err);
        })
    //#endregion


};
