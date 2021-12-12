let minutes = 15;
let cooldown = minutes*60*1000;

let allowedUsers = [
    {id:"213250789823610880", timer:0, exempt: true }, //Spy.
    {id:"295404527308242944", timer:0, exempt: true }, //Beje. Exempt if behaves....
    {id:"784141831604666378", timer:0, exempt: true }, //Gamer. Exempt if behaves....
    {id:"766303108330160180", timer:0 }, //Gamer's Alt.
    {id:"467328820664598540", timer:0}, //Rissaur
    {id:"386068524667371530", timer:0, exempt:true}, //Kath
];

module.exports = {
    coded : "2021-02-24",
    name : "spamtag",
    description : "",
    usage : "",

    args : true,
    easterEgg : true,

    help : "general",

    Execute(message, args){
        let user; allowedUsers.forEach(u => { if(u.id == message.author.id) return user = u; })
        if(!user) return;

        if(user.time > Date.now() && !user.exempt) return message.channel.send(`This command is on cooldown for another ${Math.floor((user.time - Date.now())/1000/60)+1} minutes.`);

        if(!args[0]) return message.channel.send(`Okay... you need to provide an id for me to spam tag... \`${message.client.config.settings.prefix}${this.name} <userID> [message]\``);

        //set cooldown.
        allowedUsers.forEach(user => { if(user.id == message.author.id) return user.time = Date.now() +cooldown; });

        n = 4;
        id = args.shift(); //this var is to prevent an "Additional" mention...
        if(id == "213250789823610880") return message.reply("I wont spam Shadow...")
        if(id == "378974861046841344") return message.reply("I wont spam... Myself?")
        m = `Yo <@${id}>; ${args.join(" ")}`;
        message.channel.send(`Sent by: ${message.author.tag} (${message.member.displayName})`);
        for (i = 0; i < n; i++) { message.channel.send(m); };
    }
};
