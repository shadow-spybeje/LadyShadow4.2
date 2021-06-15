const emitEvents = [
    {active: false, name: "ready", params: {}},
    {active: false, name: "guildCreate", params: {
        id:"0001",
        name:"EmitEvent 'guildCreate'"
    }},
];

module.exports = (bot) => {

    bot.util.logger.print(`Client Ready.\n> • ${bot.user.tag} (${bot.user.id})`);

    emitEvents.forEach(async (event) =>{
        if(!event.active) return;
        await bot.emit(event.name, event.params);
    });
};
