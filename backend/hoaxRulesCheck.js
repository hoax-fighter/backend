const wuzzy = require('wuzzy');

const limits = {
  expressive: 0.7,
  capital: 0.5
};

const rules = {};

const overlyExpressive = ['heboh', 'waspada', 'urgent', 'mantap', 'mengejutkan', 'menggemparkan', 'parah!'];

rules.expressive = (string) => {

  const wordsInString = string.split(' ');

  let count = 0;

  overlyExpressive.map((exp) => {
    wordsInString.map((word) => {
      if (wuzzy.levenshtein(exp, word.toLowerCase()) > limits.expressive) {
        count += 1;
      }
    });
  });

  if (count > 0) {
    return true;
  }

  return false;
}

rules.exclamation = (string) => {
  if (/!!+/g.test(string)) {
    return true;
  }

  return false;
}

rules.capital = (string) => {
  let capital = 0;
  let combinedLetters = string.replace(/\s/g, '');
  let letters = combinedLetters.split('');
  letters.map((letter) => {
    if (letter === letter.toUpperCase() && /[A-Za-z]/.test(letter)) {
      capital += 1;
    }
  });

  if (capital/(letters.length) > limits.capital) {
    return true;
  }

  return false;

}


module.exports = rules;
