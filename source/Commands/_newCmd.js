const L = async function(m,key){
    m.client.l(m,`$cmd_ping_${key}`);
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
