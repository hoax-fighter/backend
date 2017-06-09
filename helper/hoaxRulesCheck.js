const wuzzy = require('wuzzy');

const limits = {
  expressive: 0.7,
  capital: 0.5
};

const rules = {};

const overlyExpressive = ['heboh',
                          'waspada',
                          'urgent',
                          'mantap',
                          'mengejutkan',
                          'menggemparkan',
                          'parah!',
                          'wow!',
                          'WHOOPS'
                          ];

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

rules.check = (string) => {
  let result = {};

  if (string) {

    if (typeof string === 'string') {

      if (string.length > 0) {

        result.status = 'success';
        result.summary = false;
        result.expression = false;
        result.exclamation = false;
        result.capital = false;

        if (rules.expressive(string)) {
          result.expressive = true;
        }

        if (rules.exclamation(string)) {
          result.exclamation = true;
        }

        if (rules.capital(string)) {
          result.capital = true;
        }

        if (result.expressive || result.exclamation || result.capital) {
          result.summary = true;
        }

        return result;

      }

      result.status = 'error';
      result.message = 'input must not be empty';

      return result;

    }

    result.status = 'error';
    result.message = 'input must be string';

    return result;

  }

  result.status = 'error';
  result.message = 'input must not be empty';

  return result;
}


module.exports = rules;
