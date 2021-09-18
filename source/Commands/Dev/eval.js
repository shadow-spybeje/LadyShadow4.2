command = {
    name: "eval",
    Access: "Dev",
    aliases: [],
    description: "$cmd_eval_desc",
    usage: "$cmd_eval_usage"
};

command.help = "";


function clean(text){
    if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
};


command.Execute = async function(message, args){

    //Define eval phrases
    const discord = require('discord.js');
    const e = new discord.MessageEmbed();
    const bot = message.client;


    k = async function(){
        let kill = false;
        let restartMsgID = null;
        await message.channel.send("Restarting....")
        .then(msg => {
            restartMsgID=msg.id;
        }).catch( restartMsgID=message.id );

        await bot.db.edit("_Config", {}, {"evalRestart.channelID": message.channel.id, "evalRestart.messageID": restartMsgID, "evalRestart.Timestamp": Date.now()}).then(kill=true)
        .catch(err => console.error(`Error editing DataBase:\n`, err));

        if(kill) process.exit();
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

module.exports = command;
