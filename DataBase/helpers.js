
class DB_Helper {
    constructor(bot, DB){
        this.database = DB;
        this.bot = bot;
    };

    getGuild_welcomeSettings = async function(guildID){
        let welcome = {
            channel: "",
            message: "",
            roles: []
        };

        await this.database.get("Guilds", {id:guildID}, {_id:0}).then(async (results) => {
            let res = results[0]
            if(!res.channels.welcome){
                return null;
            }else{
                welcome.channel = res.channels.welcome;
            };

            if(res.config.welcome) {
                welcome.message = res.config.welcome;
            }else{
                welcome.message = `Welcome to the server {@user}`;
            };

            if(res.roles.welcome.length > 0) welcome.roles = res.roles.welcome;
        });

        return welcome;
    };

    getGuild_farewellSettings = async function(guildID){
        let farewell = {
            channel: "",
            message: "",
        };

        await this.database.get("Guilds", {id:guildID}, {_id:0}).then(async (results) => {
            let res = results[0]
            if(!res.channels.farewell){
                return null;
            }else{
                farewell.channel = res.channels.farewell;
            };

            if(res.config.farewell) {
                farewell.message = res.config.farewell;
            }else{
                farewell.message = `{@user} has left the server...`;
            };
        });

        return farewell;
    };

    todo_get = async function(userID){
        let todoList = {};
        await this.database.get("Users", {id:userID}, {_id:0, todo:1}).then(async (results) => {
            let todo = results[0].todo;
            if(!todo || todo.length == 0){
                todoList = false;
                await this.database.edit("Users", {id:userID}, {"todo": []})
            }else{
                todoList = todo;
            };
        });
        return todoList;
    };
};

module.exports = DB_Helper;
