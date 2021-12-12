const L = async function(m,key){
    return await m.client.l(m,`$cmd_%%_${key}`);
};

command = {
    name: "staff",
    aliases: [],
    description: "$cmd_staff_desc",

    EasterEgg: true,
};

command.help = "";

command.Execute = async function(message, args){
    if(message.author.id != "213250789823610880") return;
    //if 'administration' -- co-owner,
    // if 'ban-members' -- admin
    // if 'kick-members' -- moderator
};

module.exports = command;
