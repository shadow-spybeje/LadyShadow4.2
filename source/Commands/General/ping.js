const discord = require('discord.js');

const L = async function(m,key){
    return await m.client.l(m,`$cmd_ping_${key}`);
};

command = {
    name: "ping",
    name2: "$cmd_ping_name",
    aliases: [],
    description: "$cmd_ping_desc",
    usage: "$cmd_ping_usage"
};

command.help = "";

command.Execute = async function(message){

    message.channel.send(`${await L(message,`Pinging`)}`).then(async (msg) => {

        let str = [
            `${await L(message,`Client`)} : ${msg.createdTimestamp - message.createdTimestamp}ms`,
            `${await L(message,`API`)} : ${Math.round(message.client.ws.ping)}ms`
        ];

        let paddedStr = await message.client.util.other.pad(str).join('\n');

        const embed = new discord.MessageEmbed()
            .setTitle(`${await L(message,`Pong`)}`)
            .setColor('00FFFF')
            .setDescription(`\`\`\`js\n${paddedStr}\`\`\``);

        msg.delete();
        message.channel.send(embed);
    });
};

module.exports = command;
