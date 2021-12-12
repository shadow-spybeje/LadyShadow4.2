module.exports = async (member) => {
    let welcome = await member.client.db2.Guild_Welcome(member.guild.id);
    if(!welcome.channel) return;

    let wCh = await member.guild.channels.cache.get(welcome.channel);
    if(!wCh) return;

    if(!welcome.message) welcome.message = "{usertag} has joined the server.";

    msg = welcome.message
        .replace("{user}", member.user.username)
        .replace("{usertag}", member.user.tag)
        .replace("{userid}", member.user.id)
        .replace("{@user}", member.user)
        .replace("{server}", member.guild.name)
        //.replace("{channel}", wCh.name)
        /*regex = /{channel;?\d+?}/.exec(welcome.message);
        if(regex){

        };

        if(welcome.message.includes(/{channel;?\[0-9]+?}/)){
            // ; is optional
            // 0-9 (id) is optional
            // if absent, channel = wCh, else channel = "getChannel from Guild"
            // if !"getChannel", use "thisChannel" or "null"
        }*/

    wCh.send(msg);

    if(welcome.roles){
        member.roles.add(welcome.roles, "Member Joined.");
    };
};
