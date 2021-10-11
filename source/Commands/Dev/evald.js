command = {
    name: "evald",
    Access: "Dev",
    aliases: [],
    description: "$cmd_eval_desc",
    usage: "$cmd_eval_usage",
    args: true,
    EasterEgg: true,
};

command.help = "";


const clean = async (evaled, bot) => {
    if (evaled && evaled.constructor.name == "Promise") evaled = await evaled;

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    evaled = evaled
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(bot.token, "INVALID-TOKEN");;

    return evaled;
};


command.Execute = async function(message, args){

    //Define eval phrases
    const discord = require('discord.js');
    const e = new discord.MessageEmbed();
    const bot = message.client;

    try{
        let evaled = eval(args.join(" "));
        message.channel.send(await clean(evaled, message.client), {code:"js", split:true});
    }catch(err){
        message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(err, message.client)}\n\`\`\``);
    }
};

module.exports = command;
