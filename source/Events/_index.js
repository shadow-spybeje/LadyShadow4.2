const Events = {};
const EventList = keyMirror([
    //'./Events NAME', // discord event name;
    'GUILD_JOINED', // guildCreate
    'GUILD_LEFT', // guildDelete
    'MEMBER_JOINED', //guildMemberAdd
    'MEMBER_LEFT', //guildMemberRemove
    'MESSAGE_OLD', // message
    'MESSAGE', //message //ToBe new handle
    'READY', // ready
    'ERROR', // info, error, warn
]);


console.log(`\n>>> Loading Events <<<`)
for (const name of Object.keys(EventList)) {
	try {
		console.log(`> Loaded Event: ${name}`);
		Events[name] = require(`./${name}.js`);
	} catch(err) {
		console.error(`> WARN: Failed to load event: ${name}!`, err);
	} // eslint-disable-line no-empty
}

module.exports = Events;


function keyMirror(arr) {
    let tmp = Object.create(null);
    for (const value of arr) tmp[value] = value;
    return tmp;
}
