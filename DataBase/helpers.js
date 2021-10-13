
class User {
    constructor(user){
        this.id = user.id;
        this.username = user.username;
        this.names = [];
        this.locale = 'en';

        this.todoList = [];
    };

    getUser = function(userID){};

    updateUser = async function(user, message){
        let thisUser = await getUser(user.id);

        if(thisUser.name) thisUser.name = null; //Change this to 'username';
        if(!thisUser.username) thisUser.username = user.username;
        if(!thisUser.names) thisUser.names = [user.username];
        if(!thisUser.locale) thisUser.locale = message.guild.region || 'en'; // 'en' will be default locale.
        if(!thisUser.todoList) thisUser.todoList = [];
    };

    setName = function(newName){
        if(!newName || newName !== "string") throw new Error(`Name must be a string.`);
        this.name = newName;

        return this;
    };
    getName = function(){};

    setLocale = function(){};

    getLocale = function(){};
};


class DB_Helper {
    constructor(bot, DB){
        this.database = DB;
        this.bot = bot;
    };


    //#region Users_X
    /**
     * Check if our database has this user.
     * @param {int} userID represents a Discord User ID.
     * @returns {Boolean} Bool - true if user exists on the database, false if they don't.
     */
    Users_hasUser = async function(userID){
        let result = await this.database.get("Users", {id:userID}, {_id:0, id:1})
            .then(r => {
                if(r.length == 0) return false;
                else return true;
            })
            .catch(e => {
                bot.util.logger.err(`Error checking database 'hasUser():\n`, e);
                return false;
            });

        return result;
    };

    Users_getUser = async function(userID, proj){
        let p = {};
        if(proj){
            p = proj;
        }else{
            // Projection cannot have a mix of inclusion and exclusion.
            //   So if we have a {proj} we cannot hide these values otherwise we'll get an error.
            //   Besides, if the values are nto listed in our projection we wont see them anyway!

            p.lastModified = 0;
            p.createdAt = 0;
        };
        p._id = 0;

        let result = await this.database.get("Users", {id:userID}, p)
            .then(r => {
                if(r.length == 0) return false;
                else return r[0];
            })
            .catch(e => {
                this.bot.util.logger.error(`Error checking database 'getUser():\n`, e);
                return false;
            });
        return result;
    };

    Users_updateUser = async function(userID, newData){
        if(!userID || !newData) throw new Error(`updateUser() must have bot a user ID and newData!`);
        if(isNaN(userID)) throw new Error(`updateUser() userID must be a number.`);
        if(typeof newData !== "object") throw new Error(`updateUser() newData must be an object!`);

        let result = await this.database.edit("Users", {id:userID}, newData)
        .then(r => { return true })
        .catch(e => {
            this.bot.util.logger.error(`Error updating User settings information!`, e);
            return false;
        });

        return result;
    };

    Users_UpdateUser2 = async function(userID){
        if(!userID || isNaN(userID)) throw new Error(`updateUser() userID must be a number.`);

        let userData = await this.Users_getUser(userID);
        let user = await this.bot.users.fetch(userID);

        if(userData.name) userData.name = null; //Change this to 'username';
        if(!userData.username) userData.username = user.username;
        if(!userData.names) userData.names = [];
        if(!userData.prefix) userData.prefix = this.bot.config.prefix;
        if(!userData.locale) userData.locale = 'en'; // 'en' will be default locale.
        if(!userData.todoList) userData.todoList = [];

        let result = await this.Users_updateUser(userID, userData);
        return result;
    };

    Users_createUser = async function(user){
        let _user = {
            id: user.id,
            username: user.username,
            names: [],

            locale: 'en',
            prefix: this.bot.config.prefix,

            todoList: [],
        };

        let result = await this.database.post("Users", _user)
        .then(r => {
            return _user;
        })
        .catch(err => {
            this.bot.util.logger.error(`Error creating user 'DB_Helper.createUser()'`, err);
            return err;
        });

        return result;
    };

    Users_setUsername = async function(userID, username){
        if(isNaN(userID) || !userID) throw new Error(`setUsername() {userID} is not defined or is not a number!`);
        if(typeof username != "string" || !username) throw new Error(`setUsername() {username} must be defined and be a string!`);

        let user = await this.Users_getUser(userID);
        if(!user) return `User not found with ID: ${userID}`;

        user.names.push(user.username);
        user.username = username;

        return await this.Users_updateUser(userID, user);
    };

    Users_setLocale = async function(userID, newLocale){
        let user = await this.Users_getUser(userID);
        if(!user) return `User not found with ID: ${userID}`;

        user.locale = newLocale;

        return await this.Users_updateUser(userID, user);
    };

    Users_setPrefix = async function(userID, newPrefix){
        let user = await this.Users_getUser(userID);
        if(!user) return `User not found with ID: ${userID}`;

        user.prefix = newPrefix;

        return await this.Users_updateUser(userID, user);
    };
    //#endregion

    //#region Guilds_X

    Guilds_hasGuild = async function(guildID){
        let result = await this.database.get("Guilds", {id:guildID}, {_id:0, id:1})
            .then(r => {
                if(r.length == 0) return false;
                else return true;
            })
            .catch(e => {
                bot.util.logger.err(`Error checking database 'hasGuild():\n`, e);
                return false;
            });

        return result;
    };

    Guilds_getGuild = async function(guildID, proj){
        let p = {};
        if(proj){
            p = proj;
        }else{
            // Projection cannot have a mix of inclusion and exclusion.
            //   So if we have a {proj} we cannot hide these values otherwise we'll get an error.
            //   Besides, if the values are nto listed in our projection we wont see them anyway!

            p.lastModified = 0;
            p.createdAt = 0;
        };
        p._id = 0;

        let result = await this.database.get("Guilds", {id:guildID}, p)
            .then(r => {
                if(r.length == 0) return false;
                else return r[0];
            })
            .catch(e => {
                this.bot.util.logger.error(`Error checking database 'getGuild():\n`, e);
                return false;
            });
        return result;
    };

    Guilds_updateGuild = async function(guildID, newData){
        if(!guildID || !newData) throw new Error(`updateGuild() must have user ID and newData!`);
        if(isNaN(guildID)) throw new Error(`updateGuild() guildID must be a number.`);
        if(typeof newData !== "object") throw new Error(`updateGuild() newData must be an object!`);

        let result = await this.database.edit("Guilds", {id:guildID}, newData)
        .then(r => { return true })
        .catch(e => {
            this.bot.util.logger.error(`Error updating Guild settings information!`, e);
            return false;
        });

        return result;
    };

    /*Guilds_UpdateUser2 = async function(guildID){
        if(!guildID || isNaN(guildID)) throw new Error(`updateUser() guildID must be a number.`);

        let guildData = await this.Guilds_getGuild(guildID);
        let guild = await this.bot.guilds.fetch(guildID);

        if(guildData.name) guildData.name = null; //Change this to 'username';
        if(!guildData.username) guildData.username = user.username;
        if(!guildData.names) guildData.names = [];
        if(!guildData.prefix) guildData.prefix = this.bot.config.prefix;
        if(!guildData.locale) guildData.locale = 'en'; // 'en' will be default locale.
        if(!guildData.todoList) guildData.todoList = [];

        let result = await this.Guilds_updateGuild(guildID, guildData);
        return result;
    };*/

    Guilds_createGuild = async function(guild){
        let _guild = {
            status: true,
            id: guild.id,
            oID: guild.ownerID,
            name: guild.name,

            config: {
                prefix: this.bot.config.prefix,
                locale: '',
            },

            messages: {
                greeting: "",
                farewell: ""
            },

            channels: {
                welcome: '',
                farewell: '',
                rift: '',
                modlog: '',
                chatlog: '',
                userlog: ''
            },

            roles: {
                welcome: [],
                mute: '',
                staff: '',
                admin: '',
                moderator: '',
            },

            censor: {
                whitelist: {
                    roles: [],
                    users: [],
                    channels: [], //"ignore" command
                },

                phrases: { //censor.phrases[arg]
                    //"phrase": {timestmap: int, user: int}
                }
            }
        };

        let result = await this.database.post("Guilds", _guild)
        .then(r => {
            return _guild;
        })
        .catch(err => {
            this.bot.util.logger.error(`Error creating user 'DB_Helper.createGuild()'`, err);
            return err;
        });

        return result;
    };

    Guilds_updateStatus = async function(guildID, newStatus){
        if(typeof newStatus != "boolean") throw new Error(`Guilds_updateStatus {newStatus} must be of type "boolean"!`);

        await this.Guilds_getGuild(guildID).then(r => {
            r.status = newStatus;
            this.Guilds_updateGuild(guildID, r);
        })
    };

    Guild_Welcome = async function(guildID){
        let results = {
            channel: "",
            message: null,
            roles: []
        };

        await this.Guilds_getGuild(guildID, {
            "channels.welcome":1,
            "roles.welcome":1,
            "messages.greeting":1
        }).then(r => {
            if(!r.channels.welcome) return false;
            results.channel = r.channels.welcome;
            if(r.messages.greeting) results.message = r.messages.greeting;
            else results.message = `Welcome to the server {@user}`;
            if(r.roles.welcome.length > 0) results.roles = r.roles.welcome;
        });


        return results;
    };

    Guild_Farewell = async function(guildID){
        let results = {
            channel: "",
            message: null,
        };

        await this.Guilds_getGuild(guildID, {
            "channels.farewell":1,
            "messages.farewell":1
        }).then(r => {
            if(!r.channels.farewell) return results = false;
            results.channel = r.channels.farewell;
            if(r.messages.farewell) results.message = r.messages.farewell;
            else results.message = `{@user} has left the server...`;
        });

        return results;
    };
    //#endregion

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
