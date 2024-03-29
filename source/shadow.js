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
//const bot = new discord.Client({ ws: { intents: 14087 } }); global.bot = bot;
const bot = new discord.Client({ ws: { intents: 14087 }, fetchAllMembers: true }); global.bot = bot;

require('./startUp.js')(bot);

const Events = require('./Events/_index.js'); //Load our Events.
bot.Events = Events;

bot.on('ready', (_bot) => {
    if(!_bot){ Events['READY'](bot); }
    else{ Events['READY'](_bot); };
});
bot.on('message', (message) => { Events['MESSAGE_OLD'](message) }); //New Message
bot.on('guildCreate', (guild) => { Events['GUILD_JOINED'](guild) }); //JoinsGuild
bot.on('guildDelete', (guild) => { Events['GUILD_LEFT'](guild) }); //LeavesGuild
bot.on('guildMemberAdd', (member) => { Events['MEMBER_JOINED'](member) }); //memberJoins
bot.on('guildMemberRemove', (member) => { Events['MEMBER_LEFT'](member) }); //memberLeaves


bot.login(require("../../../tokens.json").Beta)


/*const config = {
    token : require("../../../tokens.json").LadyShadow
};

class LadyShadow {
    constructor(){
        this.discord = this.bot = global.bot = new discord.Client( config.token, {
            restMode: true, defualtImageFormat: 'png'
        });

        this.bot.on('ready', () => { console.log("READY")});
        console.log("Init discord/bot");

        this.bot.login(config.token)
    };
};

new LadyShadow();*/
