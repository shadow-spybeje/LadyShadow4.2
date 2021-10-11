const L = async function(m,key){
    return await m.client.l(m,`$cmd_%%_${key}`);
};

command = {
    name: "%%",
    name_L: "$cmd_%%_name",
    aliases: [],
    description: "$cmd_%%_desc",
    usage: "$cmd_%%_usage",
    args: false,

    Access: null,
    EasterEgg: false,
};

command.help = "";

command.Execute = async function(message, args){

};

module.exports = command;




class Command {
    /**
     *
     * @param {Object} options The initializer for the Commands
     * * name = string | Command name.
     * * alliases = Array<String> | Additional Command names.
     * * description = string | Command description.
     * * usage = string | How-To use the Command.
     * * args = <Boolean|Number> | are args required for this command?
     * * ^Access = String | The minimum "Access Level" for this command.
     * * ^EasterEgg = Boolean | Hides the command from help, and args require msgs.
     */
    constructor(options = {}){
        this.name = "",
        this.aliases = [];
        this.description = null;
        this.usage = null;
        this.args = false;

        this.Access = null;
        this.EasterEgg = false;

        this.Exe = null; //This is where the actual command is held.

        if(options.name) this.setName(options.name);
        if(options.description) this.setDesc(options.description);
    };

    setName(name){
        this.name = name;
    };

    setDesc(description){
        this.description = description
    };

    setExecute(fn){
        this.Exe = fn;
    };


    Execute(message, args){
        if(!this.Exe) throw new Error(`You must first set the Execute function before you attempt to Execute!\n--> "Command.setExecute(function)"`);

        this.Exe(message, args);
    };
};



let c = new Command();
c.setName("Test");
c.setDesc("Just a test...");

c.setExecute(function(message){
  message.channel.send("Testing...");
});

c.Execute(message)
