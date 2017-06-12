const axios = require('axios');
const Source = require('../models/source');
const similarityCheck = require('../helper/similarityCheck');
const negationCheck = require('../helper/negationCheck');
const webCheck = require('../helper/webCheck');
const rules = require('../helper/hoaxRulesCheck');

const hoaxChecker = (req, res, next) => {
  if (req.body.input) {
    if (String(req.body.input).length > 0) {

      const input = String(req.body.input);

      let result = {};

      // search the tbh database
      Source.find({}, (err, sources) => {

        if (err) {

          console.log(err);
          res.json({success: false, error: err});

        } else if (sources) {
          result.sources = [];

          // check for the content as whole
          sources.map((source) => {
            let content = source.hoax.replace('HOAX: ', '');
            content.replace('HASUT: ', '');
            content.replace('FITNAH: ', '');
            content.replace('MISINFORMASI: ', '');
            const simVal = similarityCheck.averagedSimilarity(input, content).value;
            if (simVal >= 60) {
              result.sources.push({ source: source, similarity: simVal });
            }
          });

          // check for every sentence in the content
          sources.map((source) => {
            const sentences = source.hoax.split('\n');
            sentences.map((sentence) => {
              let trimmed = sentence.replace('HOAX: ', '');
              trimmed.replace('HASUT: ', '');
              trimmed.replace('FITNAH: ', '');
              trimmed.replace('MISINFORMASI: ', '');
              const simVal = similarityCheck.averagedSimilarity(input, trimmed).value;
              if (simVal >= 60) {
                const negation = negationCheck(input, sentence);
                result.sources.push({ source: source, similarity: simVal, negation: negation });
              }
            });
          });

          if (result.sources.length > 0) {

            // hoax is found in tbh database, send the relevant entry
            res.json({sucess: true, sources: result.sources});

          } else {

            // check for indications in input string
            result.indications = {};
            result.indications = rules.check(input);

            // hoax is not found in tbh database, search the news
            axios.post('http://localhost:3002/api/source/news', {word: input})
              .then((response) => {

                let minSimVal = 60;
                let relevantNews = [];
                response.data.record.map((news) => {
                  if (Number(news.hasil) >= minSimVal) {
                    relevantNews.push(news);
                  }
                });

                if (relevantNews.length > 0) {

                  // relevant news from reputable sources are found
                  result.sources = relevantNews;

                  // combine the relevant news with feedback from users
                  axios.get('http://localhost:3002/api/source/feedback')
                    .then((response) => {

                      response.data.feedbacks.map((feedback) => {
                        relevantNews.map((source) => {
                          source.isUrlReputable = true;
                          if (String(feedback.name) === String(source.name) && String(feedback.description) === String(source.description) ) {
                            source.feedback = feedback;
                          }
                        });
                      });

                      res.json({success: true, sources: relevantNews, indications: result.indications});

                    })
                    .catch((err) => {
                      res.json({success: false, error: err});
                    });

                } else {

                  // cannot find any relevant entry under news category
                  // search the web
                  axios.post('http://localhost:3002/api/source/web', {word: input})
                    .then((response) => {

                      let searchResult = response.data.record;
                      // console.log(searchResult);

                      // check the url reputation
                      axios.get('http://localhost:3002/api/source/news-source')
                        .then((response) => {

                          const reputable = response.data.sources[0].reputable;
                          const blacklist = response.data.sources[0].nonReputable;

                          let checkedWebSources = webCheck(searchResult, reputable, blacklist);

                          // combine with user feedback
                          axios.get('http://localhost:3002/api/source/feedback')
                            .then((response) => {



                              response.data.feedbacks.map((feedback) => {
                                checkedWebSources.sources.map((source) => {
                                  if (String(feedback.name) === String(source.name) && String(feedback.description) === String(source.description) ) {
                                    source.feedback = feedback;
                                  }
                                });
                              });

                              let minSimVal = 60;
                              let relevantWeb = [];
                              checkedWebSources.sources.map((news) => {
                                if (Number(news.hasil) >= minSimVal) {
                                  relevantWeb.push(news);
                                }
                              });

                              if (relevantWeb.length > 0) {

                                // relevant web entry found
                                res.json({message: 'fetch reputation list', sources: relevantWeb, indications: result.indications});

                              } else {

                                // relevant web entry not found
                                res.json({
                                  message: 'fetch reputation list',
                                  sources: checkedWebSources.sources,
                                  reputable: checkedWebSources.reputable,
                                  blacklist: checkedWebSources.blacklist,
                                  nonReputable: checkedWebSources.nonReputable,
                                  indications: result.indications
                                });

                              }


                            })
                            .catch((err) => {
                              console.log('error fetching user feedback');
                              res.json({success: false, error: err});
                            });


                        })
                        .catch((err) => {
                          console.log('error fetching url list');
                          res.json({success: false, error: err});
                        });


                      // res.json({message: 'searched the web', sources: searchResult});


                    })
                    .catch((err) => {
                      res.json({success: false, error: err});
                    });

                }

              })
              .catch((err) => {
                res.json({success: false, error: err});
              });
          }

        } else {
          res.json({error: 'entah apa yang terjadi'});
        }

      });

    } else {
      res.json({success: false, error: 'input must not be empty'});
    }
  } else {
    res.json({success: false, error: 'input must not be empty'});
  }
}

module.exports = hoaxChecker;
