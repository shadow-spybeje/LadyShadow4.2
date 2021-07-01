const Events = {};
const EventList = keyMirror([
    //'./Events NAME', // discord event name;
    'GUILD_JOINED', // guildCreate
    'GUILD_LEFT', // guildDelete
    'MESSAGE', // message
    'READY', // ready
]);

for (const name of Object.keys(EventList)) {
  try {
    console.log(name);
    Events[name] = require(`./${name}.js`);
  } catch(err) { console.error(err); } // eslint-disable-line no-empty
  console.log(Events)
}

module.exports = Events;


function keyMirror(arr) {
    let tmp = Object.create(null);
    for (const value of arr) tmp[value] = value;
    return tmp;
}
