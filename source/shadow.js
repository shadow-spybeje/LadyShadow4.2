const discord = require("discord.js");

/**
 * {HSF}LadyShadow#7111
 * * V.4.0.2a
 * * December 5'th, 2020
 * * Developed By: "Shadow_Spy#1904" (ScionSpy), and "Bejebajay#1904"
 * * Support Invite: https://discord.gg/9FUpBPQ
 * * * LadyShadow is a basic Discord Moderation bot with other logging features.
 * * * Shadow includes other "fun" commands, as well as being the central hub for a Server to Server "Rift" and the main place for the "Shadow RPG".
 */
const bot = new discord.Client({ ws: { intents: 14087 } });

require('./startUp.js')(bot);

/**
 * The Available Events for this client.
 * * READY
 */
const Events = require('./events/_index.js');

bot.on('ready', (_bot) => {
    if(!_bot){ Events['READY'](bot); }
    else{ Events['READY'](_bot); };
});
bot.on('guildCreate', (guild) => { Events['GUILD_JOINED'](bot, guild) });
bot.on('guildDelete', (guild) => { Events['GUILD_LEFT'](bot, guild) });


bot.login(require("../../../tokens.json").Beta)
