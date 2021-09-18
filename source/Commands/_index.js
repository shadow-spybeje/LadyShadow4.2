const fs = require('fs');

module.exports = async () => {
    const cmds = new Map();

    const Dir = './source/Commands/';
    const CommandDir = [
        'Dev', //Bot Developer + Owners
        'General',
        //'Owner'
    ];

    console.log(`\n>>> Loading Commands <<<`)

    for(let x = 0; x < CommandDir.length; x++){
        try{
            var dir = Dir+CommandDir[x]; //Get the directory path for these commands.

            let CmdDir = await fs.readdirSync(dir).filter(file => file.endsWith('.js'));
            //Commands will end with the '.js' extension; we only want commands..

            for(const cmdFile of CmdDir){ //Loop through the Command Directory.
                const cmd = require(`./${CommandDir[x]}/${cmdFile}`); //This is the "File" that holds the command..
                cmds.set(cmd.name, cmd);
                console.log(`> Loaded ${CommandDir[x]} Command: ${cmd.name}`);
            };
        }catch(err){
            console.error(`> WARN: Failed to load Command!`, err);
        };
    };

    return cmds;
};
