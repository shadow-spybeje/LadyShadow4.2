const stats = {
    msgs:0,
    cmds:0,
    mods:0
};

const Commands = {};

Commands.e = function(cmdName, message, args){
    if(!Commands[cmdName]) return console.log("No Command: "+cmdName);
    stats.cmds++;
    Commands[cmdName](message, args);
};
Commands.ping = function(message){ message.channel.send("Pong."); };
Commands.status = function(message){
    let status = [];

    p = function(txt){
        status.push(txt);
    };

    p(`Messages read: ${stats.msgs}`);
    p(`Commands Executed: ${stats.cmds}`);
    p(`Modules Fired: ${stats.mods}`);

    message.channel.send(status.join("\n"), {code:'js', split:true});
};
Commands.eval = function(message, args){
    if(message.author.id != "213250789823610880") return;

    let bot = message.client;

    function clean(text){
        if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    };

    try{
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        message.channel.send(clean(evaled), {code:"js", split:true});
      }catch(err){
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
};

module.exports = async (message) => {

    const bot = message.client;

    if(message.author.bot) return;
    //if(message.author.id != "213250789823610880") return;

    stats.msgs++;

    let wasModule = await message.client.functions['ShadowModules'].checkForValidModules(message);
    if(wasModule) return stats.mods++;

    let p = "..";
    if(!message.content.startsWith(p)) return;
    let args = message.content.slice(p.length).trim().split(/ +/g);
    let cmdName = args.shift();

    /*//#region Prefix Check
    let prefix, sPrefix, pPrefix, args = false;
    prefix = bot.config.settings.prefix;
    if(message.channel.type == "text") sPrefix = bot.settings.g.get(message.guild.id).settings.config.prefix;

    let uSettings = bot.settings.u.get(message.author.id);
    if(uSettings) pPrefix = uSettings.settings.config.prefix; //we have a settingsFile. Set pPrefix.

    //Check for a global, server, or personal prefix.
    if(message.content.startsWith(prefix)){
        args = message.content.slice(prefix.length).trim().split(/ +/g);
    }else if(message.content.startsWith(sPrefix)){
        args = message.content.slice(sPrefix.length).trim().split(/ +/g);
    }else if(pPrefix && message.content.startsWith(pPrefix)){
        args = message.content.slice(pPrefix.length).trim().split(/ +/g);
    }else{ return; };

    //#endregion*/


    // if(message.content.startsWith(p+'CMD')) return Commands.CMD;

    /*try{
        if(cmd=='ping') return Commands.e('ping',message);
        if(cmd=='status') return Commands.e('status', message);
        if(cmd=='eval') return Commands.e('eval', message, args);
    }catch(err){
        console.error(`Error executing command: ${cmd}\n`, err);
    };*/

    let Cmd = bot.cmds.get(cmdName) || bot.cmds.find(c => c.aliases && c.aliases.includes(cmdName));

    try{
        //Check our general commands for {cmdName}
        if(!Cmd) return;


        if(!bot.Users[message.author.id]){
            let data = {
                id: message.author.id,
                lang: 'en'
            };
            bot.Users[message.author.id] = data;
            bot.db.post("Users", data).catch(err => bot.util.logger.error(`Error occured while posting user data:\n`, err))
        };

        // Since we have a command we need to be sure to set the users' language.
        // We need to check the database for an existing language, otherwise use en/us.
        if(!bot.Users[message.author.id].lang) bot.db.get("Users", {id:message.author.id}, {_id:0, id:1, lang:1})
            .then(results => {
                if(results.length != 0 && results[0].lang != null){
                    bot.Users[message.author.id].lang = results[0].lang;
                }else{ //We don't have a file for this user.
                    bot.db.edit("Users", {id:message.author.id}, {"lang": "en"})
                    .catch(err => bot.util.logger.error(`Error occured while editing user data:\n`, err));
                    bot.Users[message.author.id].lang = 'en'
                };
            })


        if(Cmd.Access){
            if(Cmd.Access == 'Dev' && message.author.id != '213250789823610880') return message.react('❌');
        }; //Cmd.Access

        if(Cmd.args && args.length == 0){
            return message.channel.send(`${await message.client.l(message, `$cmd_usage`)}\`${await message.client.l(message, `$cmd_${Cmd.name}_name`)}${await message.client.l(message, `$cmd_${Cmd.name}_usage`)}\``);
        };

        Cmd.Execute(message, args);

    }catch(err){
        console.error(`Error executing command: ${Cmd}\n`, err);
    };
};
