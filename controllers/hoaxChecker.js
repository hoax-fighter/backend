const axios = require('axios');
const Source = require('../models/source');
// const newsSearch = require('../controllers/source').news;
// const webSearch = require('../controllers/source').web;
const similarity = require('../helper/similarityCheck');
const rules = require('../helper/hoaxRulesCheck');
const negationCheck = require('../helper/negationCheck');
const webCheck = require('../helper/webCheck');

const hoaxCheck = (req, res, next) => {

  let result = {};

  if (req.body.input) {

    Source.find({}, (err, sources) => {
      if (err) {
        res.json({ status: 'error', error: err });
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
          title.replace('FITNAH: ', '');
          title.replace('MISINFORMASI: ', '');
          const simVal = similarity.averagedSimilarity(input, title).value;
          if (simVal >= 75) {
            const negation = negationCheck(input, title);
            result.tbh.bestMatchTitles.push({ source: source, similarity: simVal, negation: negation });
          }
        });

        sources.map((source) => {
          let content = source.hoax.replace('HOAX: ', '');
          content.replace('HASUT: ', '');
          content.replace('FITNAH: ', '');
          content.replace('MISINFORMASI: ', '');
          const simVal = similarity.averagedSimilarity(input, content).value;
          if (simVal >= 70) {
            result.tbh.bestMatchContents.push({ source: source, similarity: simVal });
          }
        });

        sources.map((source) => {
          const sentences = source.hoax.split('\n');
          sentences.map((sentence) => {
            let trimmed = sentence.replace('HOAX: ', '');
            trimmed.replace('HASUT: ', '');
            trimmed.replace('FITNAH: ', '');
            trimmed.replace('MISINFORMASI: ', '');
            const simVal = similarity.averagedSimilarity(input, trimmed).value;
            if (simVal >= 75) {
              const negation = negationCheck(input, sentence);
              result.tbh.bestMatchSentences.push({ source: source, similarity: simVal, negation: negation });
            }
          });
        });

        // console.log(result.tbh);

        if (result.tbh.bestMatchContents.length > 0 || result.tbh.bestMatchSentences.length > 0) {

          let maxSimVal = 0;
          let relatedEntries = [];
          let conclusion = '';

          if (result.tbh.bestMatchContents.length > 0) {
            result.tbh.bestMatchContents.map((match) => {
              relatedEntries.push(match);
              if (match.similarity > maxSimVal && match.negation.isHoax) {
                maxSimVal = match.similarity;
              }
            });
          }
          if (result.tbh.bestMatchSentences.length > 0) {
            result.tbh.bestMatchSentences.map((match) => {
              relatedEntries.push(match);
              if (match.similarity > maxSimVal && match.negation.isHoax) {
                maxSimVal = match.similarity;
              }
            });
          }

          if (relatedEntries.length > 0) {
            conclusion = "Kemungkinan Besar Hoax";
          } else {
            conclusion = "Kemungkinan Bukan Hoax";
          }

          res.send({
            success: true,
            maxSimVal: maxSimVal,
            sources: relatedEntries,
            conclusion: conclusion
          });

        } else {
          // not found in tbh database, next steps

          //input hoax indications rules check
          result.indications = {};
          result.indications = rules.check(input);

          axios.post('http://localhost:3002/api/source/news', { word: input })
            .then((response) => {

              if (response.data.record.length > 0) {

                let maxSimVal = 0;
                let conclusion = '';
                response.data.record.map((news) => {
                  if (news.hasil > maxSimVal) {
                    maxSimVal = news.hasil;
                  }
                });

                if (maxSimVal >= 75) {
                  conclusion = `Kemungkinan Besar Fakta`;
                } else if (maxSimVal >= 55) {
                  conclusion = `Kemungkinan Fakta`;
                } else {
                  conclusion = `Kemungkinan Hoax`;
                }

                res.send({
                  success: true,
                  maxSimVal: maxSimVal,
                  conclusion: conclusion,
                  sources: response.data.record,
                });

              } else {

                axios.post('http://localhost:3000/api/source/web', { word: input })
                  .then((response) => {

                    res.send({
                      success: true,
                      conclusion: 'Kemungkinan Besar Hoax',
                      sources: response.data
                    });

                  })
                  .catch((err) => {
                    res.json({
                      success: false,
                      error: err,
                      message: 'Cari Berita Gagal'
                    })
                  });
              }

            })
            .catch((err) => {
              res.json({
                success: false,
                error: err,
                message: 'Cari Berita Gagal'
              })
            });

        }

      }
    });


  } else {

    result.status = 'error';
    result.message = 'input must not be empty';

    res.send(result);

  }

}

module.exports = hoaxCheck;
