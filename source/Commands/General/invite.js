const discord = require('discord.js');

const L = async function(m,key){
    return await m.client.l(m,`$cmd_invite_${key}`);
};

command = {
    name: "invite",
    name_L: "$cmd_invite_name",
    description: "$cmd_invite_desc",
    usage: "$cmd_invite_usage"
};

command.help = "";

command.Execute = async function(message){
    message.channel.send(`${await L(message, 'inviteLink')}\n<link>`)
};

module.exports = command;
