const L = async function(m,key){
    return await m.client.l(m,`$cmd_todo_${key}`);
};

command = {
    name: "todo",
    name_L: "$cmd_todo_name",
    aliases: [],
    description: "$cmd_todo_desc",
    usage: "$cmd_todo_usage",
    args: true,

    Access: null,
    EasterEgg: false,
};

command.help = "";

command.invalidUsage = async function(message, type){
    if(!type) type == 'undefined';
    let msg = `\`Internal Error: Commands.todo.invalidUsage()\`\n\`\`\`js\n  'msg' was not set, check the type or the switch!\n  type: ${type}\`\`\``;

    if(!type){
        msg = await L(message, "invalid_usage");
    };

    switch(type){
        case('add'):
            msg = await L(message, 'invalid_usage-add');
            msg = msg.replace()
        break;
        case('del'):
            msg = await L(message, 'invalid_usage-del');
        break;
        default: msg = msg;
    };

    let prefix = message.client.config.prefix;
    if(message.client.Guilds[message.guild.id] && message.client.Guilds[message.guild.id].prefix){
        prefix = message.client.Guilds[message.guild.id].prefix
    };
    msg = msg.replace(/{prefix}/g, prefix);
    msg = msg.replace(/{cmdName}/g, await L(message, 'name'));
    msg = msg.replace('{$cmd_todo_args_list}', await L(message, 'args_list'));

    return message.channel.send(msg);
};

command.Execute = async function(message, args){

    let prefix = message.client.config.prefix;
    if(message.client.Guilds[message.guild.id] && message.client.Guilds[message.guild.id].prefix){
        prefix = message.client.Guilds[message.guild.id].prefix
    };

    let add = await L(message, 'args_add');
    add = add.split(";");
    let del = await L(message, 'args_del');
    del = del.split(";");

    if(args[0] == await L(message, "args_list")){

        let list = await message.client.db2.todo_get(message.author.id);
        if(!list){
            let msg = await L(message, "noToDos");
            msg = msg.replace(/{prefix}/g, prefix);
            msg = msg.replace(/{cmdName}/g, await L(message, 'name'));

            return message.channel.send(msg);
        }else{
            let list2 = [];
            for(x=0; x < list.length; x++){
                list2.push(`[${x}] ${list[x].note}`);
            };
            return message.channel.send(list2.join(`\n`), {code:'js', split:true});
        };

    }else if(add.includes(args[0])){ // add to the list.
        if(args.length == 1) return this.invalidUsage(message, 'add');
        message.channel.send("+");

        /*
            todo = {
                1: {timestamp:int, note:str}
            }
        */

    }else if(del.includes(args[0])){ //remove from the list.
        if(args.length == 1) return this.invalidUsage(message, 'del');
        message.channel.send("-");

    }else{ //Invalid subCommand.
        message.channel.send('thisElse')
        return this.invalidUsage(message);
    };
};

module.exports = command;
