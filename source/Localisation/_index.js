const fs = require('fs');

module.exports = async (bot) => {
    bot.locale = new Map();
    locales = [
        'da',
        'de',
        'fr',
        'en',
    ];

    try {
        console.log(`\n>>> Loading Locales <<<`);

        for(let x = 0; x < locales.length; x++){
            la = locales[x];
            bot.locale[la] = await require(`./${la}.js`);
            console.log(`> Loaded locale for: ${la}`);
        };

    }catch(err){
            console.error(`> WARN: Failed to load Locale!`, err);
    };

    return bot.locale;
};
