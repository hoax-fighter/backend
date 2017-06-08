const wuzzy = require('wuzzy');
const stringSimilarity = require('string-similarity');

let string1 = 'bumi datar';
let string2 = 'bumi itu datar';

// console.log('string 1: ', string1);
// console.log('string 2: ', string2);

const methods = {};

methods.jarowinkler = (str1, str2) => {
  let one = str1.toLowerCase();
  let two = str2.toLowerCase();
  let temp = wuzzy.jarowinkler(one, two);
  return (Math.round(temp * 100) / 100) * 100;
}

methods.levenshtein = (str1, str2) => {
  let one = str1.toLowerCase();
  let two = str2.toLowerCase();
  let temp = wuzzy.levenshtein(one, two);
  return (Math.round(temp * 100) / 100) * 100;
}

methods.stringSimilarity = (str1, str2) => {
  let one = str1.toLowerCase();
  let two = str2.toLowerCase();
  let temp = stringSimilarity.compareTwoStrings(one, two);
  return (Math.round(temp * 100) / 100) * 100;
}

// Jaro-Winkler method kurang OK sepertinya..
// let jarowinkler = wuzzy.jarowinkler(string1.toLowerCase(), string2.toLowerCase());
// let jarowinklerResult = (Math.round(jarowinkler * 100) / 100) * 100;
// console.log(`jaro-winkler method: ${jarowinklerResult} %`);

// let levenshtein = wuzzy.levenshtein(string1.toLowerCase(), string2.toLowerCase());
// let levenshteinResult = (Math.round(levenshtein * 100) / 100) * 100;
// console.log(`levenshtein method: ${levenshteinResult} %`);

// let dice = stringSimilarity.compareTwoStrings(string1.toLowerCase(), string2.toLowerCase());
// let diceResult = (Math.round(dice * 100) / 100) * 100;
// console.log(`sorensen-dice method: ${diceResult} %`);



module.exports = {
  methods
}