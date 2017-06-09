const Source = require('../models/source');
const similarity = require('../helper/similarityCheck');
const rules = require('../helper/hoaxRulesCheck');
const negation = require('../helper/negationCheck');

const hoaxCheck = (req, res, next) => {

  let result = {};

  if (req.body.input) {

    Source.find({}, (err, sources) => {
      if (err) {
        res.json({status: 'error', error: err});
      } else {

        const input = req.body.input;

        result.status = 'success';
        result.tbh = {
          bestMatchTitles: [],
          bestMatchContents: [],
          bestMatchSentences: []
        };

        // similarity check
        sources.map((source) => {
          let title = source.title.replace('HOAX: ', '');
          title.replace('HASUT: ', '');
          const simVal = similarity.averagedSimilarity(input, title).value;
          if (simVal >= 75) {
              result.tbh.bestMatchTitles.push({source: source, similarity: simVal});
          }
        });

        sources.map((source) => {
          let content = source.hoax.replace('HOAX: ', '');
          content.replace('HASUT: ', '');
          const simVal = similarity.averagedSimilarity(input, content).value;
          if (simVal >= 70) {
              result.tbh.bestMatchContents.push({source: source, similarity: simVal});
          }
        });

        sources.map((source) => {
          const sentences = source.hoax.split('\n');
          sentences.map((sentence) => {
            let trimmed = sentence.replace('HOAX: ', '');
            trimmed.replace('HASUT: ', '');
            const simVal = similarity.averagedSimilarity(input, trimmed).value;
            if (simVal >= 75) {
                result.tbh.bestMatchSentences.push({source: source, similarity: simVal});
            }
          });
        });



        res.send(result);

      }
    });


  } else {

    result.status = 'error';
    result.message = 'input must not be empty';

    res.send(result);

  }

}

module.exports = hoaxCheck;
