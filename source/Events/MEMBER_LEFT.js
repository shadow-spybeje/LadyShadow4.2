module.exports = async (member) => {
    let guild = member.guild;
    let farewell = await member.client.db2.Guild_Farewell(member.guild.id);
    if(!farewell.channel) return;

    let fCh = await guild.channels.cache.get(farewell.channel);
    if(!fCh) return;

    if(!farewell.message) farewell.message = "{usertag} has left the server.";

    msg = farewell.message
        .replace("{user}", member.user.username)
        .replace("{usertag}", member.user.tag)
        .replace("{userid}", member.user.id)
        .replace("{@user}", member.user)
        .replace("{server}", member.guild.name);

    fCh.send(msg);
};
