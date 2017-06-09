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
        result.similarity = [];


        sources.map((source) => {
          result.similarity.push(similarity.averagedSimilarity(input, source.hoax));
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
