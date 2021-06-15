const Helpers = {};
module.exports = Helpers;

let bot;

/**
 * initializes the {bot} variable allowing the lower functions to work.
 * This is executed in the "Ready" event.
 * This will delete it'self from the Utilites once executed.
 * @param {Discord Client} _bot
 * @returns {Utilities}
 */
Helpers._Init = function(_bot){
    bot = _bot;
    delete this.init;
    return this;
};

/**
 * Checks if the acting user is a support member.
 * @param {string} userID Discord UserID.
 * @returns bool
 */
Helpers.isSupport = function(userID){
   let isSupport = false;

   bot.config.support.team.roles.support.forEach(member => {
       if(member.id == userID) isSupport = true;
   });

   return isSupport;
};

/**
 * Checks if the acting user is a admin member.
 * @param {string} userID Discord UserID.
 * @returns bool
 */
Helpers.isAdmin = function(userID){
    let isAdmin = false;

    bot.config.support.team.roles.admin.forEach(member => {
        if(member.id == userID) isAdmin = true;
    });

    return isAdmin;
};

/**
 * Calls the Database and checks for any entires with {guildID}
 * @param {int} guildID integer representing a Discord GuildID.
 * @param {boolean} createNew if the entry does not exist. Create one.
 * @returns guild database settings || false
 */
Helpers.getServerSettings = async function(guildID, createNew){
    let error;
    if(!guildID){ error = "'guildID' is not defined! \"getServerSettings(guildID)\"" }
    else{ if(isNaN(guildID)) error = "'guildID' must be a number!" }
    if(error) return { error:{ code:0, msg:"getServer.Error" },msg:error};

    let results = await bot.db.get("Guilds", {id:guildID}, {_id:0, id:0, createdAt:0, lastModified:0})
        .then(result => {
            if(result.length != 0){
                return result[0];
            }else{ //noSettings
                return false;
            };
        })
        .catch(error => { return error });

    if(!results){
        console.log(`Utilites: 'getServer' (false) Create server settings.`);
        return false
    };

    return results;
};

/**
* Calls the Database and checks for any entires with {userID}
* @param {int} userID integer representing a Discord UserID.
* @param {boolean} createNew if the entry does not exist. Create one.
* @returns user database settings || false
*/
Helpers.getUserSettings = async function(userID, createNew){
    let error;
    if(!userID){ error = "'userID' is not defined! \"getUserSettings(userID)\"" }
    else{ if(isNaN(userID)) error = "'userID' must be a number!" }
    if(error) return { error:{ code:0, msg:"getUser.Error" },msg:error};

    let results = await bot.db.get("Users", {id:userID}, {_id:0, id:0, createdAt:0, lastModified:0})
        .then(result => {
            if(result.length != 0){
                return result[0];
            }else{ //noSettings
                return false;
            };
        })
        .catch(error => { return error });

    if(!results){
        console.log(`Utilites: 'getUser' (false) Create user settings.`);
        return false
    };

    return results;
};
