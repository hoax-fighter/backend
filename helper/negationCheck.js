const similarity = require('./similarityCheck');

const negations = ['tidak', 'tak', 'bukan', 'hampir', 'nyaris', 'gagal'];

const negationCheck = (string, titleArray) => {
  let result = {};
  if (string && titleArray && titleArray.length > 0) {
    if(typeof string === 'string' && typeof titleArray === 'array') {

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
