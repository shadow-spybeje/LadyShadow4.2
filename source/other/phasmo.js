const phasmo = {};
let ready = false;

//#region phasmo.options description
  // They're options dumbass!! What else do you need to know?!?!
  //#endregion
phasmo.options = {
    //Developer thing.
    debug: false,

    // This module's interactor.
    prefix: "--",

    // How to split your words/evedince. (Probably should leave this alone...)
    msgSplitter: " ",

    // If we choose to lock it to a single server.
    server: "",

    // Lock this module to ONLY these userid's.
    // (If any are provided, ONLY they can use the module.) **
    whitelist: [],

    // Blacklist these userid's from this module. **
    blacklist: [],

    // ** If a user is BOTH whitelisted AND blacklisted, they still cannot use the module.
    // // If they are the ONLY user whitelisted, [NO ONE] can use the module!!
};

/**
 *
 * @param {Object} options Object of options, if an option is not inputed a defualt '()' will be selected.
 * * {Bool} debug (false)
 * * {String} prefix (',,') -- How to activate this module.
 * * {String} msgSplitter (' ') how to seperate words.
 * * {String || Number} server ('') a discord guild ID.
 * * {Array} whitelist ([]) an array of users who are only allowed to use this module.
 * * * (!) If whitelist is enabled (Adding an array) Nobody else will be able to use this module!
 * * {Array} blacklist ([]) an array of users who Cannot use this module.
 * @returns
 */
phasmo._Init = function(options = {}){

    if(options.debug){
        if(typeof options.debug !== "boolean"){
            throw new Error("Phasmo Options 'debug' must be a boolean!");
        }else { phasmo.options.debug = options.debug };
    };

    if(options.prefix){
        if(typeof options.prefix !== "string"){
            throw new Error("Phasmo Options 'prefix' must be a string!");
        }else { phasmo.options.prefix = options.prefix };
    };

    if(options.msgSplitte){
        if(typeof options.msgSplitter !== "string"){
            throw new Error("Phasmo Options 'msgSplitter' must be a string!");
        }else { phasmo.options.msgSplitter = options.msgSplitter };
    };

    if(options.msgSplitter){
        if(typeof options.msgSplitter !== "string"){
            throw new Error("Phasmo Options 'msgSplitter' must be a string!");
        }else { phasmo.options.msgSplitter = options.msgSplitter };
    };

    if(options.server){
        if(typeof options.server !== "string" && isNaN(options.server)){
            throw new Error("Phasmo Options 'server' must be a number!");
        }else{ let server = options.server.toString(); phasmo.options.server = server; };
    };

    if(options.whitelist){
        if(typeof options.whitelist !== "array"){
            throw new Error("Phasmo Options 'whitelist' must be an array!");
        }else { phasmo.options.whitelist = options.whitelist };
    };

    if(options.blacklist){
        if(typeof options.blacklist !== "array"){
            throw new Error("Phasmo Options 'blacklist' must be an array!");
        }else { phasmo.options.blacklist = options.blacklist };
    };

    isReady = true;

    delete this._Init;
    return this;
};

/**
 * Our built-in ghost database!
 */
phasmo.ghosts = [
        /*{
            type: "",
            evidence: [],
            strength: "",
            weakness: "",
            tip: ""
        },*/
    {
        type: "Spirit",
        evidence: ["Spirit Box", "Fingerprints", "Ghost Writing"],
        strength: "None",
        weakness: "Using smudge sticks to prevent attacks; for about 180s.",
        tip:""
    },{
        type: "Revenant",
        evidence: ["EMF Level 5", "Fingerprints", "Ghost Writing"],
        strength: "Fast when hunting.",
        weakness: "Slow when you are hidden.",
        tip: "You **Cannot** outrun a Revenant!"
    },{
        type: "Demon",
        evidence: ["Spirit Box", "Ghost Writing", "Freezing Temperatures"],
        strength: "Will attack aggressively",
        weakness: "Asking a question on a ouija board won’t lower a player’s sanity.",
        tip: ""
    },{
        type: "Shade",
        evidence: ["EMF Level 5", "Ghost Orb", "Ghost Writing"],
        strength: "Hard to find.",
        weakness: "A shade won’t hunt if players are in groups.",
        tip: "Stay together in the ghost's room!"
    },{
        type: "Mare",
        evidence: ["Spirit Box", "Ghost Orb", "Freezing Temperatures"],
        strength: "Increased attacks in the dark",
        weakness: "Light",
        tip: "Turn on lights in the Ghost's room to decrease the chance of a hunt."
    },{
        type: "Banshee",
        evidence: ["EMF Level 5", "Fingerprints",  "Freezing Temperatures"],
        strength: "Targets one player at a time (that is terrifying)",
        weakness: "The crucifix",
        tip: "A Banshee can spontaneously start a hunt if it's target is out of sight for 20s after teleporting to them.\n  Due to this, it's a good cause to believe you're dealing with a Banshee if a Hunt starts while everyone is 80% Sanity or more."
    },{
        type: "Wraith",
        evidence: ["Fingerprints", "Freezing Temperatures", "Spirit Box"],
        strength: "Footsteps cannot be traced",
        weakness: "Reacts to salt",
        tip: ""
    },{
        type: "Phantom",
        evidence: ["EMF Level 5", "Ghost Orb", "Freezing Temperatures"],
        strength: "Looking at a phantom will cause your sanity to drop",
        weakness: "Taking its photo will cause it to disappear",
        tip: "Trying to take it's photo during a hunt is not only a bad idea, but is not effective."
    },{
        type: "Yurei",
        evidence: ["Ghost Orb", "Ghost Writing", "Freezing Temperatures"],
        strength: "Affects player sanity more than normal",
        weakness: "Using a smudge stick to prevent it from moving",
        tip: ""
    },{
        type: "Jinn",
        evidence: ["Spirit Box", "Ghost Orb", "EMF Level 5"],
        strength: "The further you are away, the faster a Jinn is",
        weakness: "Turning off a location’s power source will make the Jinn slower.",
        tip: ""
    },{
        type: "Poltergeist",
        evidence: ["Spirit Box", "Fingerprints", "Ghost Orb"],
        strength: "Can throw multiple objects at once",
        weakness: "Empty rooms",
        tip: ""
    },{
        type: "Oni",
        evidence: ["EMF Level 5", "Spirit Box", "Ghost Writing"],
        strength: "Can move objects quickly",
        weakness: "Active when more players are nearby",
        tip: ""
    },{
        type: "Yokai",
        evidence: ["Ghost Orb", "Spirit Box", "Ghost Writing"],
        strength: "Talking near this ghost makes it much angrier and more likely to attack!",
        weakness: "When hunting, a Yokai can only hear near itself.",
        tip: "It appears this ghost can hunt above 50% sanity if you make it angry enough by talking."
    },{
        type: "Hantu",
        evidence: ["Fingerprints", "Ghost Orb", "Ghost Writing"],
        strength: "Lower temperatures make the ghost faster!",
        weakness: "Hantu moves slower in warm areas.",
        tip: "Keep the power on to avoid the house getting cold!"
    }
];

/**
 * checks for misstpyes -- usefull with the new Grammar module.
 */
phasmo.evidence = [
    /*
    {
        title: "",
        alias: []
    },
    */
    {
        title: "prints",
        alias: ["fingers", "prints"]
    },{
        title: "box",
        alias: ["spiritbox", "box"]
    },{
        title: "writing",
        alias: ["ghostwriting", "ghostw", "gw", "writing"]
    },{
        title: "orbs",
        alias: ["ghostorb","ghosto", "go"]
    },{
        title: "temps",
        alias: ["freezingtemperatures", "freezingtemps", "temps"]
    },{
        title: "5",
        alias: ["emflevel5", "emf", "5"]
    }
];


/**
 * the "Message Handler" for this module.
 * @param {object} msg {channel, msg:string}
 */
phasmo.msg = async function(msg){
    if(!ready) return; //if not initialized, or initialization failed. Do not allow module to be used.

    if(phasmo.options.debug) console.log("logged with: "+JSON.stringify(msg.msg))
    //msg = {channel:msg.channel, msg:msg.content};
    let message = msg.msg;
    if(!message.startsWith(phasmo.options.prefix)){
        return;
    }else{
        if(phasmo.options.whitelist.length > 0){
            if(!phasmo.options.whitelist.includes(msg.userid)) return;
        };
        if(phasmo.options.blacklist.length > 0){
            if(phasmo.options.blacklist.includes(msg.userid)) return;
        };

        message = message.slice(phasmo.options.prefix.length).trim().split(/ +/g).join(" "); //"ph. ";
        if(!message) return;
    };

    if(message == "help")return msg.channel.send(`\`${phasmo.options.prefix}<evedince1>${phasmo.options.msgSplitter}[evidence2]${phasmo.options.msgSplitter}[evidence3]\` Search for a ghost with these as evidence.\n\`${phasmo.options.prefix}type${phasmo.options.msgSplitter}<Ghost type>\` Look up this ghost type.`);

    if(message == "bugs") return msg.channel.send(`**What happened:**\n**What did you expect to happen:**\n**What map was it:**\n**Was it in multiplayer:** Yes\n**VR or non-vr:** Non-VR`, {code:"JS"});

    let ghosts = null;
    let evidence = message.toLowerCase()/*.replace(/../gi, "-")*/.split(phasmo.options.msgSplitter);
    if(!evidence) return;

    if(evidence[0] =="type"){
        let type = evidence[1];
        let ghost = await phasmo.ghostType(type);

        if(ghost.length == 0) { ghost[0]="-1"; ghost[1] = "No ghost type found with this criteria!"; }
        return phasmo.send(message, msg.channel, ghost);
    };

    evidence = await this.evidenceGrammar(evidence); // ????
    ghosts = await this.ghostSearch(evidence);
    if(ghosts.length == 0) { ghosts[0]="-1"; ghosts[1] = "No ghost type found with this criteria!"; }
    phasmo.send(message, msg.channel, ghosts);
};

/**
 * Check spelling, is there any SH (Short hand) ??
 * * * * PROTOTYPE
 * @param {*} evidence
 * @returns
 */
phasmo.evidenceGrammar = async function(evidence){

    let evid = [];
    evidence.forEach(arrayList => {
        let found = false;

        phasmo.evidence.forEach(phasmoEvidence => {

            if(found) return;
            if(phasmoEvidence.alias.includes(arrayList)){
                evid.push(phasmoEvidence.title);
                found=true;
            };

        });
        if(!found) evid.push(arrayList); // We're trying for the default.
    });

    if(!evid) evid = evidence; //we didn't find any matches..... we'll try it....
    return evid;
};

/**
 * The player wnats to know about a specific type of ghost... Let's share!!
 * @param {*} type
 * @returns
 */
phasmo.ghostType = async function(type){
    let theseGhosts = [];
    phasmo.ghosts.forEach(Ghost => {
        //if(theseGhosts.length==1) return;
        let Type = Ghost.type.toLowerCase();
        if(Type.includes(type)) return theseGhosts.push(Ghost);
    });

    return theseGhosts;
};

/**
 * Search our built-in database to see if any of the evedince provided matches any of our ghosts.
 * @param {*} evidence
 * @returns
 */
phasmo.ghostSearch = async function(evidence){
    let ev = evidence; let _ev = [];
    ev.forEach(e => {
        if(e.includes("orbs")) e="orb";
        if(e.includes("temps")) e="temp";
        if(e.includes("gw")) e="ghostwriting";
        if(e.includes("gw")) e="ghostwriting";

        _ev.push(e);
    });evidence=_ev;
    let someGhosts = [];

    let someGhosts1 = [];
    phasmo.ghosts.forEach(Ghost =>{ //this is ran default.
        Ghost.evidence.forEach(Evidence =>{
            let lowered = Evidence.toLowerCase();
            if(lowered.includes(evidence[0])){ someGhosts1.push(Ghost) }
            //else{  };
        });

    });

    let someGhosts2 = [];
    if(evidence.length>1){//we have TWO evidence.
        //Search our running list.
        someGhosts1.forEach(Ghost => {
            Ghost.evidence.forEach(Evidence =>{
                let lowered = Evidence.toLowerCase();
                if(lowered.includes(evidence[1])) someGhosts2.push(Ghost)
            });
        });
    };

    let someGhosts3 = [];
    if(evidence.length>2){//we have THREE evidence.
        //Search our running list.
        someGhosts2.forEach(Ghost => {
            Ghost.evidence.forEach(Evidence =>{
                let lowered = Evidence.toLowerCase();
                if(lowered.includes(evidence[2])) someGhosts3.push(Ghost)
            });
        });
    };

    //GREAT!!!
    //Now check all the arrays, and assign the last one as our "Ghosts" array.
    if(someGhosts3.length>0){
        someGhosts = someGhosts3;
    }else if(someGhosts2.length>0){
        someGhosts = someGhosts2;
    }else if(someGhosts1.length>0){
        someGhosts = someGhosts1;
    };

    return someGhosts;
};

/**
 * Retunr a list of possible ghosts to the channel.
 * @param {*} query
 * @param {*} channel
 * @param {*} ghosts
 */
phasmo.send = function(query, channel, ghosts){
    let TheGhosts = [];

    if(ghosts[0]!="-1"){
        ghosts.forEach(ghost => {
            let msg = [
                `[Type]: ${ghost.type}`,
                `[Evidence]: ${ghost.evidence.join(", ")}`,
                `[Strength]: ${ghost.strength}`,
                `[Weakness]: ${ghost.weakness}`
            ];
            if(ghost.tip!="") msg.push(`[Tips]: ${ghost.tip}`);
            TheGhosts.push(msg.join("\n"));
        });
    }else{
        TheGhosts[0] = ghosts[1];
    };

    channel.send(`Ghost Results for: **${query}**\`\`\`css\n${TheGhosts.join("``````css\n")}\`\`\``, {split: true});
};

module.exports = phasmo;
