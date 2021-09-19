const L = async function(m,key){
    return await m.client.l(m,`$cmd_kick_${key}`);
};

command = {
    name: "kick",
    aliases: ['boot'],
    description: "$cmd_kick_desc",
    usage: "$cmd_kick_usage",
    args: true
};

command.help = "";

command.Execute = async function(message, args){
    if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) return message.reply(await L(message, "noPerms-Author"));

    let member = await message.client.util.helpers.getUserMention(args.shift());
    if(!member) return message.reply(await L(message, "noMember"));

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`${await L(message, `noPerms-Client`)} ${member.username}\`!\n--> ${member}`)

    let reason = args.join(" ");

    if(!message.guild.members.cache.get(member.id)){
        if(message.guild.me.hasPermission("BAN_MEMBERS") && message.member.hasPermission("BAN_MEMBERS")){
            message.reply(`${member.tag} ${await L(message, "noMemberFound-ban")}`)
            .then(msg => {
                msg.react('✅').then(m => msg.react('❎'));
                msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'), { max: 1, time: 30000 })
                .then(async (reactions) => {
                    if(reactions.first() == '✅'){
                        message.guild.ban(member, reason)
                        .then(async () =>{ message.channel.send(`${await L(message, "ban-succ")} ${member.tag}.`); })
                        .catch(async (err) => {
                            console.error(err);
                            message.client.util.helpers.sendTo("bugs", `\`\`\` \`\`\`Error banning a member!!\nServer: ${message.guild.id}\nExecuter: ${message.author.id}\nBanee: ${member.id}\nERR: ${err}`);
                            message.channel.send(`${await L(message, "ban-fail")} ${member}`);
                        });
                    }else{
                        return message.channel.send(`${message.author.tag}: ${await L(message, "$ban-no")}`);
                    };
                });
            });
        }else{
            return message.reply(`${member.tag} ${await L(message, "noMemberFound")}`);
        };
    }else{ //Member not found (Ban?)

        message.guild.members.cache.get(member.id).kick(member, reason)
        .then(async () =>{
            message.channel.send(await L(message, "kick-succ"));
        }).catch(async (err) => {
            console.error(err);
            message.client.util.helpers.sendTo("bugs", `\`\`\` \`\`\`Error kicking a member!!\nServer: ${message.guild.id}\nExecuter: ${message.author.id}\nKickee: ${member.id}\nERR: ${err}`);
            message.channel.send(`${await L(message, "kick-fail")} ${member}`);
        });
    };
};

module.exports = command;
