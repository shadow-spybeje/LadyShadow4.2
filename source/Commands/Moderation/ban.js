const L = async function(m,key){
    return await m.client.l(m,`$cmd_ban_${key}`);
};

command = {
    name: "ban",
    name_L: "$cmd_ban_name",
    aliases: [],
    description: "$cmd_ban_desc",
    usage: "$cmd_ban_usage",
    args: true,

    Access: null,
    EasterEgg: true,
};

command.help = "";

command.Execute = async function(message, args){
    if(message.author.id != "213250789823610880") return

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(await L(message, "noPerms-Author"));
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`${await L(message, `noPerms-Client`)} ${member.username}\`!\n--> ${member}`)

    let member = await message.client.util.helpers.getUserMention(args.shift());
    if(!member) return message.reply(await L(message, "noMember"));
    if(!member.bannable) return message.reply(await L(message, "notBannable"));

    let reason = "";
    if(args.length == 0){
        reason = await L(message, 'reason-x');
        reason = reason.replace('{author}', message.author.tag).replace('{authorID}', message.author.id);
    }else{
        reason = await L(message, 'reason');
        reason = reason.replace('{author}', message.author.tag).replace('{authorID}', message.author.id).replace('{reason}', args.join(" "));
    };


    message.guild.members.ban(member, {reason: reason})
    .then(async () => {
        message.react('✅');
        let txt = "";

        "Alright, I've banned {user}\nReason: {reason}"
        if(args.length > 0){ //notice with reason
            txt = await L(message, 'ban-succ-r');
            txt = txt.replace('{@user}', member).replace('{reason}', args.join(" "));
        }else{ //notice without reason
            txt = await L(message, 'ban-succ');
            txt = txt.replace('{@user}', member);
        };

        message.channel.send(txt);
    })
    .catch(async (err) => {
        let errR = await L(message, 'ban-fail');
        await errR.replace('{@user}', member.tag).replace('{err}', `\`${err.name}: ${err.message}\``);
        message.channel.send(errR);
        message.client.util.logger.error(err, err);
    });

};

module.exports = command;
