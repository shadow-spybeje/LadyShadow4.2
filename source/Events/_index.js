const Events = {};
const EventList = keyMirror([
    //'./Events NAME', // discord event name;
    'GUILD_JOINED', // guildCreate
    'READY', // ready
]);

for (const name of Object.keys(EventList)) {
  try {
    Events[name] = require(`./${name}.js`);
  } catch {} // eslint-disable-line no-empty
}

module.exports = Events;


function keyMirror(arr) {
    let tmp = Object.create(null);
    for (const value of arr) tmp[value] = value;
    return tmp;
}
