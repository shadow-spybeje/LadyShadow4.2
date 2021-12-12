const fs = require('fs');

/**
Functions = {

};
*/
const Functions = {};
module.exports = Functions;

//let bot;

/**
 * Initializes the Functions framework.
 * @param {discordClient} _bot discordClient
 * @returns Functions.
 */
Functions._Init = function(_bot){
    //bot = _bot;
    //delete this._Init;

    Functions.ShadowModules = require("./shadowModules.js")._Init(bot);

    bot.send = Functions.send;

    return this;
};

/**
 * Send data to a specific support channel
 * @param {string} channel Support channel to send the {content}
 * * 'guildStatus'
 * * 'blacklists'
 * @param {string | object} content content to send.
 */
Functions.send = async function(channel, content){
    let id;

    switch(channel){
        case('guildStatus'): id = bot.config.support.server['guildStatus']; break;
        case('blacklists'): id = bot.config.support.server['blacklists']; break;
        default: return;
    };

    let ch = await bot.channels.cache.get(id);
    if(!ch) return bot.util.logger.warn(`No Support channel found ${channel}!`);

    ch.send(content);
};


/**
 * Get a user settings, or create one if one doesn't already exist.
 * @param {User} user represnts a discord user.
 */
bot.awaitUser = async function(user){
    if(!user || user.discriminator == '0000') return;
    let dbUser = await bot.db2.getUser(user.id);

    if(!dbUser){ // User does not exist on the DB, create a entry.
        log.print(`Creating __**User**__ entry for: \`${user.username} (${user.id})\``, 'logs');
        let data = {
            id: user.id,
            isbot: user.bot,
            username: user.username,
            discriminator: user.discriminator,
            usernames: [{
                username: user.username,
                discriminator: user.discriminator,
                timestamp: Date.now()
            }],
            avatarURL: await user.avatarURL({dynamic:true, format:'jpg'})
        };

        if(!user.bot) data.locale = 'en';

        bot.db2.createUser(data);
    }else{ // User exists, let's check to make sure all data is current and updated.
        let newUser = {};
        let needsUpdate = false;

        if(dbUser.username != user.username || dbUser.discriminator != user.discriminator){
            if(dbUser.username != user.username) newUser.username = user.username;
            if(dbUser.discriminator != user.discriminator) newUser.discriminator = user.discriminator;


            if(!dbUser.usernames) dbUser.usernames = [{
                username: dbUser.username,
                discriminator: dbUser.discriminator,
                timestamp: Date.now(),
            }];

            newUser.usernames = dbUser.usernames;
            newUser.usernames.push({
                username: user.username,
                discriminator: user.discriminator,
                timestamp: Date.now(),
            });

            needsUpdate = true;
        };

        if (dbUser.avatarURL != user.avatarURL({dynamic:true, format:'jpg'})) {
            //let m = `old\`\`\`${dbUser.avatarURL}\`\`\`new\`\`\`${user.avatarURL({dynamic:true,format:'jpg'})}\`\`\``
            //log.print(m);

            newUser.avatarURL = user.avatarURL({dynamic:true, format:'jpg'});
            needsUpdate = true;
        };

        if(needsUpdate) bot.db2.updateUser(user.id, newUser);
    };
};

/**
 * Get a guild settings, or create one if one doesn't already exist.
 * @param {Guild} guild represnts a discord guild.
 */
bot.awaitGuild = async function(guild){
    if(!guild) return false;
    let dbGuild = await bot.db2.getGuild(guild.id);

    if(!dbGuild){ // guild does not exist on the DB, create a entry.
        log.print(`Creating __**Guild**_ entry for: \`${guild.name} (${guild.id})\``, 'logs');
        let data = {
            id: guild.id,
            name: guild.name,
            locale: 'en',
            names: [{
                name: guild.name,
                timestamp: Date.now()
            }],
            iconURL: guild.iconURL({format: 'jpg', dynamic:true}),
            config: {prefix:'..'},
        };

        await bot.db2.createGuild(data);
    }else{ // User exists, let's check to make sure all data is current and updated.
        let newGuild = {};
        let needsUpdate = false;

        if(dbGuild.name != guild.name){
            newGuild.username = guild.name;

            newGuild.names.push({
                name: guild.name,
                timestamp: Date.now(),
            });

            needsUpdate = true;
        };

        if(dbGuild.iconURL != guild.iconURL({dynamic:true,format:'jpg'})) {
            newGuild.iconURL = guild.iconURL({dynamic:true,format:'jpg'});
            needsUpdate = true;
        };

        if(needsUpdate) bot.db2.updateGuild(guild.id, newGuild);
    };
};


/**
 * Create a entry in the database for this message.
 * @param {object} msg reperesenting a discord message.
 * @param {Number} type A number representing the type for this message.
 * * 0: create
 * * 1: edit/update
 * * else: deleted
 * @returns
 */
bot.createChatLog = function (msg, type){

    if (msg.channel.id == '907412031290900520') return;

    //bu.Metrics.chatlogCounter.labels(type === 0 ? 'create' : type === 1 ? 'update' : 'delete').inc();

    let data = {
        userID: msg.author.id, // The user who created this message.
        msgID: msg.id, // This is the message's ID.
        chID: msg.channel.id, // The channel that the message was created in.
        guildID: msg.channel.guild ? msg.channel.guild.id : 'DM', // The guild, if any, otherwise DM.

        type: type, // 0 = created, 1 = edited, 2 = deleted.

        timestamp: {
            createdAt: msg.createdTimestamp,
            lastEditedAt: 0
        },

        content: msg.content,
        attachments: /*msg.attachments[0] ? msg.attachments[0].url : */undefined,
        embeds: msg.embeds,

        edits: [/*{
            timestamp: Date.now(),
            content: msg.content
        }*/],
    };

    if(msg.attachments){
        let attachments = msg.attachments;
        data.attachments = [];
        for (let _a of attachments) {
            /**
             * MessageAttachment
             * INT(AttachmentID){
             *   attachment: str(URL:cdn.discordapp),
             *   name: str,
             *   id: str,//(int),
             *   size: int,//(bytes?),
             *   url: str,//(URL),
             *   proxyURL: str,//(URL:media.discordapp), //backup server.
             *   height: int,
             *   width: int
             * };
             */
            __a = {
                id:_a.id,
                name:_a.name,
                size:_a.size,
                url:_a.url,
                height:_a.height,
                width:_a.width,
            };
            data.attachments.push(__a);
        };
    };

    /*let gID = msg.guild ? msg.guild.id : "DM";
    let gNa = msg.guild ? msg.guild.name : "";
    let mem = msg.member ? msg.member.displayName : msg.author.username;
    let atch = msg.attachments[0] ? `\n${msg.attachments[0].url}` : "";
    let log = `> \`Gid-\`${gID} \`Cid-\`${msg.channel.id}\n` +
            `> \`Uid-\`${msg.author.id} \`Mid-\`${msg.id}\n` +
            `> ${gNa} \`-\` ${msg.channel.name} \`-\` ${msg.author.username} \`-\` (\`${mem}\`)\n` +
            `${msg.content}${atch}`;*/

    try {
        //bot.channels.cache.get('907412031290900520').send(log);
        bot.db.post("ChatLogs", data);
    } catch (err) {
        console.error(`Error creating new chatlog entry in DB:\n`, err);
    };
};

/**
 * @param data {object}
 */
bot.getLogs = async function(data = {msgID: null, chID: null, userID: null, limit:100}) {
    if(!data.msgID && !data.chID && !data.userID) return `must include an mID, uID, or cID to lookup. got null.`;

    let _data = {};

    if(data.msgID){
        _data.msgID = data.msgID;
    }else{
        if(data.chID) _data.chID = data.chID;
        if(data.userID) _data.userID = data.userID;
    };
    if(!data.limit || data.limit > 100) data.limit = 100;
    _data.limit = data.limit;

    let messages = await bot.db2.getLogs(_data); //returns an array.
    let msgs = [];
    let cachedUsers = [];

    for(let x = 0; x < messages.length; x++){
        let msg = messages[x];
        if(!cachedUsers[msg.userID]){
            let user = await bot.users.cache.get(msg.userID);
            cachedUsers[msg.userID] = user.tag;
        };
        msgs.push(`${msg.timestamp.createdAt}\n${cachedUsers[msg.userID]}: ${msg.content}`);
    };
    //let logs = messages.join('\n\n');

    //await fs.writeFileSync(`../.././logs/ChatLogs/${Date.now()}.txt`, logs, 'utf-8')
    return msgs;
};
