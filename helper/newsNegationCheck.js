const similarity = require('./similarityCheck');

const negations = ['tidak', 'tak', 'bukan', 'hampir', 'nyaris', 'gagal', 'batal'];

const stringNegationCheck = (string, negations) => {
  let result = {};
  let foundNegations = [];
  let stringWithoutNegation = '';
  negations.map((negation) => {
    let pattern = new RegExp(negation);
    if (pattern.test(string)) {
      foundNegations.push(negation);
    }
  });

  foundNegations.map((negation) => {
    stringWithoutNegation = string.replace(`${negation}`, '');
  });

  result.foundNegations = foundNegations;
  result.stringWithoutNegation = stringWithoutNegation;

  return result;

}

const arrayNegationCheck = (array, negations) => {

  let result = {};
  let foundNegations = [];
  let titlesWithoutNegation = [];
  array.map((title) => {
    negations.map((negation) => {
      let pattern = new RegExp(negation);
      if (pattern.test(title)) {
        foundNegations.push(negation);
        titlesWithoutNegation.push(title.replace(`${negation}`, ''));
      }
    });
  });

  result.foundNegations = foundNegations;
  result.titlesWithoutNegation = titlesWithoutNegation;

  return result;

}

const negationCheck = (string, hoax) => {
  let result = {};
  if (string && hoax) {
    if(typeof string === 'string' && typeof hoax === 'string') {

      const negationInString = stringNegationCheck(string, negations).foundNegations;

      if (negationInString.length > 0) {

        if (similarity.averagedSimilarity(string, hoax).value > 50) {

          const stringCheckResult = stringNegationCheck(string, negations);

          let simVal = similarity.averagedSimilarity(stringCheckResult.stringWithoutNegation, hoax).value;

          if (simVal > similarity.averagedSimilarity(string, hoax).value) {

            result.status = 'success';
            result.similarityWithoutNegation = simVal;
            result.isInputNegated = true;
            result.isSourceSimilar = true;
            result.message = 'the string without negation has higher similarity, most likely same topic but negated';
            return result;

          }

          result.status = 'success';
          result.similarityWithoutNegation = simVal;
          result.isInputNegated = true;
          result.isSourceSimilar = false;
          result.message = 'the string without negation has lower similarity, most likely most likely different topic';
          return result;

        }

        result.status = 'success';
        result.similarityWithoutNegation = similarity.averagedSimilarity(string, hoax).value;
        result.isInputNegated = true;
        result.isSourceSimilar = false;
        result.message = 'negation is found, however title is not higher than 50% in similarity, it is assumed to be irrelevant';
        return result;
      }

      result.status = 'success';
      result.isInputNegated = false;
      result.isSourceSimilar = similarity.averagedSimilarity(string, hoax).value > 50;
      result.message = 'negation is not found in the string';
      return result;

    }

    result.status = 'error';
    result.message = 'first params must be string and second params must be an array of strings';
    return result;

  }

  result.status = 'error';
  result.message = 'string and string array must not be empty';
  return result;

}

module.exports = negationCheck;
