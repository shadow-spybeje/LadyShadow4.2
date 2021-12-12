/**
 *
 */



bot.createChatLogx = (msg, type) => {
    //if (!config.cassandra) return null;
    if (msg.channel.id == '204404225914961920')
        return;
    //bu.Metrics.chatlogCounter.labels(type === 0 ? 'create' : type === 1 ? 'update' : 'delete').inc();
    let data = {
        //id: Date.now(),
        content: msg.content,
        attachment: msg.attachments[0] ? msg.attachments[0].url : undefined,
        userid: msg.author.id,
        msgid: msg.id,
        channelid: msg.channel.id,
        guildid: msg.channel.guild ? msg.channel.guild.id : 'DM',
        msgtime: Date.now(),
        type: type,
        embeds: JSON.stringify(msg.embeds)
    };

    try {
        //insert into DB;
        bot.db.post("ChatLogs", data);

        //await bu.cclient.execute(
        //    insertQuery1,
        //    data,
        //    { prepare: true }
        //);
        //await bu.cclient.execute(
        //    insertQuery2,
        //    { id: data.id, msgid: msg.id, channelid: msg.channel.id },
        //    { prepare: true }
        //);
    } catch (err) {
    };
};
