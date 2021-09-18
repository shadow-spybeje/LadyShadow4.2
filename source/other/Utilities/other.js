const Others = {};
module.exports = Others;

let bot;

/**
 * initializes the {bot} variable allowing the lower functions to work.
 * This is executed in the "Ready" event.
 * This will delete it'self from the Utilites once executed.
 * @param {Discord Client} _bot
 * @returns {Utilities}
 */
Others._Init = function(_bot){
    bot = _bot;
    delete this.init;
    return this;
};


/**
 * Add some padding or a "Buffer" to the right orleft side of text to make things more "evenly lined".
 * @param {Array<String>} array List of items to be buffered.
 * @param {Number} padStart Number of whitespace to add in addition to the buffer.
 * @param {Boolean} alignLeft Alignment of the string, 'true' to make the buffer start on the left instead of right.
 * @returns {Array<String>} an array of padded strings.
 */
Others.pad = function(array, padStart, alignLeft){
    let result = [];
    let padding = 0;
    if(padStart) padding = padStart;
    for(let x = 0; x < array.length; x++){
        let i = array[x].toString();
        if(i.length > padding){
            if(!padStart){
                padding = i.length;
            }else{
                padding = (i.length + padStart);
            };
        };
    };

    for(let x = 0; x < array.length; x++){
        let i = array[x].toString();
        let paddedI;
        if(!alignLeft){
            paddedI = i.padStart(padding);
        }else{
            paddedI = i.padEnd(padding);
        };
        result.push(paddedI);
    };

    return result;
};
