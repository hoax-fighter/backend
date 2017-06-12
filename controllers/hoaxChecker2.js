const axios = require('axios');
const Source = require('../models/source');
const similarityCheck = require('../helper/similarityCheck');
const negationCheck = require('../helper/negationCheck');
const webCheck = require('../helper/webCheck');
const rules = require('../helper/hoaxRulesCheck');
const summarizer = require('../helper/summarizer');

const hoaxChecker = (req, res, next) => {
  console.log('in hoaxChecker2');
  if (req.body.input) {
    if (String(req.body.input).length > 0) {

      const input = String(req.body.input);

      let result = {};

      // search the tbh database
      Source.find({}, (err, sources) => {
        console.log('Fetching the tbh source');
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

            console.log('Found similar entry in tbh!');
            // hoax is found in tbh database, return the relevant entry

            const tbh = [];

            result.sources.map((source) => {
              let item = {
                name: source.source.title,
                description: source.source.hoax,
                similarity: source.similarity,
                negation: source.negation
              };
              tbh.push(item);
            });

            res.json({
              success: true,
              sources: tbh
            });

          } else {
            console.log('No similar entry in tbh, continue to check bing news!');
            // check for indications in input string
            result.indications = {};
            result.indications = rules.check(input);

            // hoax is not found in tbh database, search the news
            axios.post('http://localhost:3002/api/source/news', {word: input})
              .then((response) => {
                console.log('done fetching news!');
                console.log(response.data);
                let minSimVal = 60;
                let relevantNews = [];
                response.data.record.map((news) => {
                  if (Number(news.hasil) >= minSimVal) {
                    relevantNews.push(news);
                  }
                });

                if (relevantNews.length > 0) {
                  console.log('Found relevant news search result!');

                  // relevant news from reputable sources are found
                  result.sources = relevantNews;

                  // combine the relevant news with feedback from users
                  axios.get('http://localhost:3002/api/source/feedback')
                    .then((response) => {
                      console.log('user feedback has been fetched!');
                      response.data.feedbacks.map((feedback) => {
                        relevantNews.map((source) => {
                          source.isUrlReputable = true;
                          if (String(feedback.name) === String(source.name) && String(feedback.description) === String(source.description) ) {
                            source.feedback = feedback;
                          }
                        });
                      });

                      let final = {success: true, sources: relevantNews, indications: result.indications};
                      final.result = summarizer(final);

                      res.json(final);

                    })
                    .catch((err) => {
                      console.log('error combining news with feedback');
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
                                res.json({success: true, sources: relevantWeb, indications: result.indications});

                              } else {

                                // relevant web entry not found
                                let final = {
                                  success: true,
                                  sources: checkedWebSources.sources,
                                  reputable: checkedWebSources.reputable,
                                  blacklist: checkedWebSources.blacklist,
                                  nonReputable: checkedWebSources.nonReputable,
                                  indications: result.indications
                                };

                                final.result = summarizer(final);

                                res.json(final);

                              }


                            })
                            .catch((err) => {
                              console.log('error combining web search with feedback');
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
