const wuzzy = require('wuzzy');
const stringSimilarity = require('string-similarity');

const methods = {};

methods.jarowinkler = (str1, str2) => {
  const result = {};
  if (str1 && str2) {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
      if (str1.length > 0 && str2.length > 0) {
        let one = str1.toLowerCase();
        let two = str2.toLowerCase();
        let temp = wuzzy.jarowinkler(one, two);
        result.status = 'success';
        result.value = (Math.round(temp * 100) / 100) * 100;
        return result;
      }
      result.status = 'error';
      result.message = 'inputs must not be empty';
      return result;
    }
    result.status = 'error';
    result.message = 'inputs must be strings';
    return result;
  }
  result.status = 'error';
  result.message = 'inputs must not be empty';
  return result;
}


methods.levenshtein = (str1, str2) => {
  const result = {};
  if (str1 && str2) {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
      if (str1.length > 0 && str2.length > 0) {
        let one = str1.toLowerCase();
        let two = str2.toLowerCase();
        let temp = wuzzy.levenshtein(one, two);
        result.status = 'success';
        result.value = (Math.round(temp * 100) / 100) * 100;
        return result;
      }
      result.status = 'error';
      result.message = 'inputs must not be empty';
      return result;
    }
    result.status = 'error';
    result.message = 'inputs must be strings';
    return result;
  }
  result.status = 'error';
  result.message = 'inputs must not be empty';
  return result;
}


methods.sorensendice = (str1, str2) => {
  const result = {};
  if (str1 && str2) {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
      if (str1.length > 0 && str2.length > 0) {
        let one = str1.toLowerCase();
        let two = str2.toLowerCase();
        let temp = stringSimilarity.compareTwoStrings(one, two);
        result.status = 'success';
        result.value = (Math.round(temp * 100) / 100) * 100;
        return result;
      }
      result.status = 'error';
      result.message = 'inputs must not be empty';
      return result;
    }
    result.status = 'error';
    result.message = 'inputs must be strings';
    return result;
  }
  result.status = 'error';
  result.message = 'inputs must not be empty';
  return result;
}

methods.averagedSimilarity = (str1, str2) => {
  const result = {};
  const jw = methods.jarowinkler(str1, str2);
  const lv = methods.levenshtein(str1, str2);
  const sd = methods.sorensendice(str1, str2);
  if (jw.status === 'success' && lv.status === 'success' && sd.status === 'success') {
    result.status = 'success';
    result.value = (Math.round( ((jw.value + lv.value + sd.value)/3) * 100) /100 ) * 100;
    return result;
  } else if (jw.status === 'error') {
    return jw;
  } else if (lv.status === 'error') {
    return lv;
  } else if (sd.status === 'error') {
    return sd;
  }
}

module.exports = methods;
