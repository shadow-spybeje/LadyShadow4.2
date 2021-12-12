command = {
    name: "prefix",
    name_L: "$cmd_%%_name",
    aliases: [],
    description: "$cmd_%%_desc",
    usage: "$cmd_%%_usage",
    args: false,

    Access: null,
    EasterEgg: false,
};

command.help = "";

command.Execute = async function(message, args){
    if(!args || args.length == 0){
        let settings = await bot.db2.getGuild(message.guild.id);
        let prefix = settings.config.prefix;
        return message.channel.send(`My prefix is: \`${prefix}\``);
    }else{
        if(!message.member.hasPermission("MANAGE_SERVER")) return;
        let settings = await bot.db2.getGuild(message.guild.id);
        if(settings.config.prefix == args.join(" ")) return message.channel.send(`My prefix for this server is already \`${args.join(" ")}\``);

        try{
            await bot.db2.updateGuildPrefix(message.guild.id, args.join(" "));
            message.channel.send(`Updated Prefix!\`\`\`\nOld: ${settings.config.prefix}\nNew: ${args.join(" ")}\`\`\``);
        }catch(e){
            log.error(`Error updating guild prefix (${message.guild.id})=[${args.join(" ")}]:\n`,e);
            message.channel.send(`Failed to update the guild prefix...`);
        };
    };
};

module.exports = command;
