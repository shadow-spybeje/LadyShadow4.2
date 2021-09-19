const L = async function(m,key){
    return await m.client.l(m,`$cmd_%%_${key}`);
};

command = {
    name: "%%",
    aliases: [],
    description: "$cmd_%%_desc",
    usage: "$cmd_%%_usage"
};

command.help = "";

command.Execute = async function(message){

};

module.exports = command;
