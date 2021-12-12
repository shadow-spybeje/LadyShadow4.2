command = {
    name: "eval",
    Access: "Dev",
    aliases: [],
    description: "$cmd_eval_desc",
    usage: "$cmd_eval_usage",
    args: true,
    EasterEgg: true,
};

command.help = "";


async function clean(text, bot){
    if(typeof(text) === "string") return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(bot.token, "INVALID-TOKEN");

    else return text; //require("util").inspect(text);
};


/*const clean = async (evaled, bot) => {
    if (evaled && evaled.constructor.name == "Promise") evaled = await evaled;

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    evaled = evaled
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(bot.token, "INVALID-TOKEN");;

    return evaled;
};*/


command.Execute = async function(message, args){

    //Define eval phrases
    const discord = require('discord.js');
    const e = new discord.MessageEmbed();
    const bot = message.client;

    var settings = {
        g: await bot.db2.Guilds_getGuild(message.guild.id),
        u: await bot.db2.Users_getUser(message.author.id)
    };

    k = async function(){
        let kill = false;
        let restartMsgID = null;
        await message.channel.send("Restarting....")
        .then(msg => {
            bot.util.logger.print(`========== <   RESTARTING   > ========== <`)
            restartMsgID=msg.id;
        }).catch( restartMsgID=message.id );

        await bot.db.edit("_Config", {}, {"evalRestart.channelID": message.channel.id, "evalRestart.messageID": restartMsgID, "evalRestart.Timestamp": Date.now()}).then(kill=true)
        .catch(err => console.error(`Error editing DataBase:\n`, err));

        if(kill) process.exit();
    };

    let invite = function(){ return message.channel.send('https://discord.com/oauth2/authorize?client_id=378974861046841344&scope=bot&permissions=469855430'); };

    let stats = `I've read a total of (${bot.stats.read.human + bot.stats.read.bot}) messages.\n  Of those, (${bot.stats.read.human}) were from humans, and (${bot.stats.read.bot}) were from other bots.\n    I have executed (${bot.stats.c}) commands for the humans.\n\nOf these messages, I have watched and learned from (${bot.stats.read.x.H.length}) different humans and (${bot.stats.read.x.B.length}) unique bots.`;

    try{
        let evaled = eval(args.join(" "));
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        const cleaned = await clean(evaled, message.client);
        message.channel.send(cleaned, {code:"js", split:true});
    }catch(err){
        message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(err)}\n\`\`\``);
    }
};

module.exports = command;
