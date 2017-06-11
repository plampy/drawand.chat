const adjectives = require('../../resx/adjectives.json');
const nouns = require('../../resx/nouns.json');

const adjLength = adjectives.length;
const nounLength = nouns.length;

module.exports = {
    randomColor: function() {
        // random color function derived from code found at
        // https://stackoverflow.com/a/1484514/2313300
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    randomUsername(){
        var adjectiveIndex = Math.floor(Math.random() * adjLength);
        var nounIndex =  Math.floor(Math.random() * nounLength);
        var adjective = adjectives[adjectiveIndex].charAt(0).toUpperCase() + adjectives[adjectiveIndex].slice(1);
        var noun = nouns[nounIndex].charAt(0).toUpperCase() + nouns[nounIndex].slice(1);
        return adjective + noun;
    }
}