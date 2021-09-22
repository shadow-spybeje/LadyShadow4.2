const L = async function(m,key){
    return await m.client.l(m,`$cmd_%%_${key}`);
};

command = {
    name: "sayd",
    aliases: [],
    description: "$cmd_%%_desc",
    usage: "$cmd_%%_usage"
};

command.help = "";

command.Execute = async function(message, args){
    try{
        message.delete().then(message.channel.send(args.join(" ")))
    }catch(err){
        return;
    };
};

module.exports = command;
