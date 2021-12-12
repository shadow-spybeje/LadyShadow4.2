command = {
    name: "warn",
    name_L: "$cmd_%%_name",
    aliases: [],
    description: "---",
    usage: "<@user|userID> [reason]",
    args: false,

    Access: null,
    EasterEgg: true,
};

command.help = "";

command.Execute = async function(message, args){
    return;
    if(args.length < 1) return message.reply(`You must give me a user to warn!`);
    if(!message.member.hasPermission("KICK_MEMBERS")) return //they noPerms;
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return //me noPerms;

    let member = await message.client.util.helpers.getUserMention(args.shift());
    if(!member) return //member not found;
    //if(!member.bannable) return //member not bannable;

    let reason = ``;
    let users = [member.id];
    if(args.length == 1){
        //default reason;
        reason = `${message.author.tag} warn`;
    }else{
        /*if(args[0] != "+" && !args[0].startsWith("+")){
            reason = args.join(" ");
        }else{
            //we're warning multiple users.
            for(x=0; x<args.length;x++){
                let arg = args[x];
                message.channel.send(arg)
                let mem;
                if(arg.startsWith("+")){
                    mem = await message.client.util.helpers.getUserMention(arg.replace("+", ""));
                }else if(!isNaN(arg)){
                    mem = await message.client.util.helpers.getUserMention(arg);
                };
                if(mem) users.push(mem.id);
            };
        };*/

        for(x=0;x<args.length;x++){
            let thisArg = args.shift();
            //await message.channel.send(thisArg);
            console.log(args);
            console.log(thisArg);
            let mem = await message.client.util.helpers.getUserMention(thisArg);
            console.log(mem);
            if(!mem){
                reason = `${thisArg} ${args.join(" ")}`;
                //break;
            };
            users.push(mem.id);
            console.log(users);
        };
    };

    message.channel.send(`\`WARN\` \`\`\`js\n Users:${users.join("; ")}\nReason:${reason}\`\`\``);
};

module.exports = command;
