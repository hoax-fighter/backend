const wuzzy = require('wuzzy');
const stringSimilarity = require('string-similarity');

let string1 = 'bumi datar';
let string2 = 'bumi itu datar';

console.log('string 1: ', string1);
console.log('string 2: ', string2);

// Jaro-Winkler method kurang OK sepertinya..
let jarowinkler = wuzzy.jarowinkler(string1.toLowerCase(), string2.toLowerCase());
let jarowinklerResult = (Math.round(jarowinkler*100)/100)*100;
console.log(`jaro-winkler method: ${jarowinklerResult} %`);

let levenshtein = wuzzy.levenshtein(string1.toLowerCase(), string2.toLowerCase());
let levenshteinResult = (Math.round(levenshtein*100)/100)*100;
console.log(`levenshtein method: ${levenshteinResult} %`);

let dice = stringSimilarity.compareTwoStrings(string1.toLowerCase(), string2.toLowerCase());
let diceResult = (Math.round(dice*100)/100)*100;
console.log(`sorensen-dice method: ${diceResult} %`);
