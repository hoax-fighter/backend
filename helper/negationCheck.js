const similarity = require('./similarityCheck');

const negations = ['tidak', 'tak', 'bukan', 'hampir', 'nyaris', 'gagal'];

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

  // console.log(foundNegations);

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

// const negationCheck = (string, titleArray) => {
//   let result = {};
//   if (string && titleArray && titleArray.length > 0) {
//     if(typeof string === 'string' && Array.isArray(titleArray)) {
//
//       const negationInString = stringNegationCheck(string, negations).foundNegations;
//       // console.log(negationInString);
//
//       if (negationInString.length > 0) {
//
//         let probableTitles = [];
//
//         titleArray.map((title, index) => {
//           // console.log(similarity.averagedSimilarity(string, title).value);
//           if (similarity.averagedSimilarity(string, title).value > 75) {
//             probableTitles.push(title);
//           }
//         });
//
//         if (probableTitles.length > 0) {
//
//           const stringCheckResult = stringNegationCheck(string, negations);
//
//           let maxSimilarity = 0;
//
//           titleArray.map((title, index) => {
//             let value = similarity.averagedSimilarity(stringCheckResult.stringWithoutNegation, title).value;
//             // console.log(title);
//             // console.log(value);
//             if (value > maxSimilarity) {
//               maxSimilarity = value;
//               result.value = value;
//               result.title = title;
//             }
//           });
//
//           if (maxSimilarity > 90) {
//
//             result.status = 'success';
//             result.result = true;
//             result.message = 'the string without negation finds similarity > 90 %, most likely a hoax';
//             // console.log(result);
//             return result;
//
//           }
//
//           result.status = 'success';
//           result.result = false;
//           result.message = 'the string without negation does not find similarity > 90 %, probably not a hoax';
//           // console.log(result);
//           return result;
//
//         }
//
//         result.status = 'success';
//         result.result = false;
//         result.message = 'no title is higher than 75% in similarity';
//         // console.log(result);
//         return result;
//       }
//
//       result.status = 'success';
//       result.result = false;
//       result.message = 'negation is not found in the string';
//       // console.log(result);
//       return result;
//
//     }
//
//     result.status = 'error';
//     result.message = 'first params must be string and second params must be an array of strings';
//     return result;
//
//   }
//
//   result.status = 'error';
//   result.message = 'string and string array must not be empty';
//   return result;
//
// }

const negationCheck = (string, hoax) => {
  let result = {};
  if (string && hoax) {
    if(typeof string === 'string' && typeof hoax === 'string') {

      const negationInString = stringNegationCheck(string, negations).foundNegations;

      if (negationInString.length > 0) {

        if (similarity.averagedSimilarity(string, hoax).value > 75) {

          const stringCheckResult = stringNegationCheck(string, negations);

          let simVal = similarity.averagedSimilarity(stringCheckResult.stringWithoutNegation, hoax).value;

          if (simVal > 90) {

            result.status = 'success';
            result.result = true;
            result.isHoax = false;
            result.message = 'the string without negation finds similarity > 90 %, most likely not a hoax';
            // console.log(result);
            return result;

          }

          result.status = 'success';
          result.result = false;
          result.isHoax = true;
          result.message = 'the string without negation does not find similarity > 90 %, most likely a hoax';
          // console.log(result);
          return result;

        }

        result.status = 'success';
        result.result = false;
        result.isHoax = false;
        result.message = 'no title is higher than 75% in similarity';
        // console.log(result);
        return result;
      }

      result.status = 'success';
      result.result = false;
      result.isHoax = true;
      result.message = 'negation is not found in the string';
      // console.log(result);
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
