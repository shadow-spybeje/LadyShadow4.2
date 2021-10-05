module.exports = async (member) => {
    let guild = member.guild;
    let welcome = await member.client.db2.getGuild_welcomeSettings(guild.id);
    if(!welcome.channel) return;

    let wCh = await guild.channels.cache.get(welcome.channel);
    if(!wCh) return;

    msg = welcome.message
        .replace("{user}", member.user.username)
        .replace("{@user}", member.user)
        .replace("{server}", member.guild.name);

    wCh.send(msg);

    if(welcome.roles){
        member.roles.add(welcome.roles, "Member Joined.");
    };
};
