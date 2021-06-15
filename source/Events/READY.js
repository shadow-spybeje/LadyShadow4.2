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

module.exports = (bot) => {

    if(bot.isEmit){ //This is an Emit;
        bot.util.logger.emit(`Client Ready.\n> • DiscordClient#0000 (0000)`);


        bot.isEmit = false;
        return;
    }else{

        bot.util.logger.print(`Client Ready.\n> • ${bot.user.tag} (${bot.user.id})`);

        emitEvents.forEach(async (event) => {
            bot.util.logger.print(`Emit Event: ${event}`);
            if(event == "ready"){
                bot.isEmit = true;
                return await bot.emit(event, bot);
            };
            await bot.emit(event, Events[event]);
        });
    };
};
