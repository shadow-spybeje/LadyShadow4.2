const Events = {};

Events._EventList = {
    /*
    "MM-DD": {
        activity: {
            type: "PLAYING" || "LISTENIGN" || "WATCHING",
            name: "STATUS MESSAGE",
            url: "https://www.twitch.tv/scion_spy" //Required for a 'watching' type. only used with 'watching'.
        },
        callback: async function(){

        };
    }
    */


    "10-29": {//National Cat Day - Playing with the kittens.
        activity: {
            type: "PLAYING",
            name: "with the kittens."
        },
    },
    "10-31": {//Halloween - Playing with the pumkins.
        activity: {
            type: "PLAYING",
            name: "with the pumpkins."
        },
        /*customCallback: async function(){
            let err = function(){
                bot.util.logger.print(`GameChanger(): Unable to post for Gamer's Birthday...`);
            };

            let guild = await bot.guilds.cache.get("787576597233532928"); //Gamers Fan Server
            let ch = "789102723853320222"; //#Announcments
            if(!guild || !guild.available){
                guild = await bot.guilds.cache.get("416906584900239370"); //ShdwSupport
                ch = "417164262335578144"; //#otherAnnouncements
                if(!guild || !guild.available) return err();
            };

            ch = await guild.channels.cache.get(ch);
            if(!ch) return err();

            ch.send(`Happy Birthday Gamer!!`);
        },*/
        /*subscribedEvents: async function(){
            return; //ToDo
            let msg = `{role},\n__***🎃🎃🎃 Happy Halloween!! 🎃🎃🎃***__`;
            //cycle through guilds,
            //if guild has a db.channels.subscribed.events channel
            //post event.

            let ch = thisGuild = db.channels.subscribed.events.channel;

            if(DB.channels.subscribed.events.mentionRole){
                msg = msg.replace('{role}', mentionRole);
            }else{
                msg = msg.replace('{role},\n', '');
            };

            ch.send(msg).then(async (m) => {
                await m.react('🎃');
                await m.react('👻');
            });
        }*/
    },
    "12-25": {//Christmas - Watching the snowflakes.
        activity: {
            type: "WATCHING",
            name: "the snowflakes.",
            url: "https://www.twitch.tv/scion_spy"
        }
    }

};

Events.GameChanger = async function(manual, date){
    console.log({m:manual, d:date})
    if(manual){
        if(manual == -1) return `Time until GameChanger interval (hours): ${(Events.night.getTime() - Date.now())/1000/60/60}`; //1000=seconds / 60=minutes /60=hours
        thisAct = bot.user.presence.activities[0];
        /**
         * @param {String} status Status of the client.
         * * online
         * * idle
         * * dnd
         * * invisible
         */
        let presence = {
            status: bot.user.presence.status,
            activity: {
                type: thisAct.type,
                name: thisAct.name,
                url: thisAct.url,
                emoji: thisAct.emoji,
            },
        };

        if(typeof manual === "string"){
            presence.activity.name = manual;
            let u = await bot.user.setPresence( presence );
            return u;

        }else if(typeof manual !== "object") return `data must be an object, got ${typeof manual}`;
        if(manual.status) presence.status = manual.status;
        if(manual.name) presence.activity.name = manual.name;
        if(manual.type != "WATCHING") presence.activity.type = manual.type;
        if(manual.type == "WATCHING" && !manual.url) return `Cannot set a 'Watching' type without a URL!`
        if(manual.type == "WATCHING" && manual.url){
            presence.activity.type = "WATCHING",
            presence.activity.url = manual.url
        };
        if(manual.emoji) presence.activity.emoji;


        return await bot.user.setPresence( presence );
    };

    if(!date){
        date = await Events.GetDate(); //date == 'MM-DD';
        date = `${date.getMonth()+1}-${date.getDate()}`;
    };

    let event = await Events.GetEvent(date);
    /*
        event = {
            activity: {
                type: "PLAYING", "WATCHING", "LISTENING"
                name: STRING,
                url: STRING
                //url must be present for a 'WATCHING' type.
                //url only used with a 'WATCHING' type.
            },
            //customCallback: //not yet used. (custome events)
            //subscribedEvents: //not yet used (allows shadow to post 'event messages' +
            // in servers with the 'subscribedToEvents' status set to  true )
        }
    */

    await bot.user.setPresence({
        status: "idle",
        activity: event.activity,
    });

    let r = await Events.resetAtMidnight();
    return r;
};

Events.GetDate = async function(addTo){
    if(!addTo) addTo = 0;
    let date = new Date();
    let _date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() +addTo,
        00, 00, 00, 000
    );

    return _date;
};

Events.GetEvent = async function(date){
    let cc = '';
    let event = await bot.db.get("Events", {date:date}, {_id:0, createdAt:0, lastModified:0}).then(r => {
        if(r.length > 0){
            cc = ` - CUSTOM EVENT:${r[0].title}`
            return r[0];
        }else return false;
    }).catch(e => {
        bot.util.logger.error(`Error loading events from DB:\n`, e);
        return false;
    });

    if(!event) event = { activity: {
        type: "WATCHING",
        name: `the beta version. | ${bot.config.prefix}help`,
        url: "https://www.twitch.tv/scion_spy" //Required for a 'watching' type. only used with 'watching'.
    }};

    bot.util.logger.print(`EVENT CHANGE:${date}: EVENT LOADED${cc}\n>>> ${JSON.stringify(event)}`);
    return event;
};

Events.resetAtMidnight = async function(){
    var now = await new Date();
    Events.night = await Events.GetDate(1);
    var _msToMidnight = Events.night.getTime() - now.getTime();

    setTimeout(async function(){
        let T = `${Events.night.getMonth()+1}-${Events.night.getDate()}`;
        bot.util.logger.print(`GameChanger: setTimeout() Executing GameChange for '${T}'`)
        await Events.GameChanger(false, T);
        //Events.resetAtMidnight(); //Then, reset again next midnight.
    }, _msToMidnight);

    function getTime(ms){ //_msToMidnight/1000/60/60 = hrs
        let minutes = ms/1000/60;
        let hours = 0;
        while((minutes -59) > 0){
            minutes = minutes -60;
            hours++
        };

        if(hours > 0){
          _hours = `${hours} hour`;
          if(hours > 1) _hours = _hours +'s';
        };
        if(minutes > 0){
          _minutes = ` and ${Math.ceil(minutes)} minute`;
          if(minutes > 1) _minutes = _minutes +'s';
        };
        let time = `${_hours}${_minutes}`;
        return time;
    };

    return `GameChanger: Checking for a new status in ${getTime(_msToMidnight)}.`;
};



module.exports = Events;
