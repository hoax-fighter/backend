const axios = require('axios');
const Source = require('../models/source');
const Post = require('../models/post');
const similarityCheck = require('../helper/similarityCheck');
const negationCheck = require('../helper/negationCheck');
const newsNegationCheck = require('../helper/newsNegationCheck');
const webCheck = require('../helper/webCheck');
const rules = require('../helper/hoaxRulesCheck');
const summarizer = require('../helper/summarizer');
import { url } from '../helper/constants';

const simValPost = 50;
const simValTbh = 60;
const simValNews = 30;
const simValWeb = 30;

const hoaxChecker = (req, res, next) => {

  if (req.body.input) {
    const input = String(req.body.input).replace(/[\"\']/ig,('\"'));
    if (input.length > 0) {

      if (/\w+/.test(input)) {

        let result = {};

        // search the user posting
        Post.find({}, (err, posts) => {})
          .then((posts) => {
            let relevantPosts = []
            posts.map((post) => {
              const simValTitle = similarityCheck.averagedSimilarity(input, post.title).value;
              const simValContent = similarityCheck.averagedSimilarity(input, post.content).value;
              const sentences = post.content.split('. ');
              let simValSentence = 0;
              if (sentences.length > 1) {
                sentences.map((sentence) => {
                  const sim = similarityCheck.averagedSimilarity(input, sentence).value;
                  if (sim > simValSentence) {
                    simValSentence = sim;
                  }
                });
              }
              const maxSimVal = Math.max(Number(simValTitle), Number(simValSentence), Number(simValContent));
              post.similarity = maxSimVal;
              if (maxSimVal > simValPost) {
                relevantPosts.push(post);
              }
            });

            result.posts = relevantPosts;

            // search the tbh database
            Source.find({}, (err, sources) => {
              console.log('Fetching the tbh source');
              if (err) {

                console.log(err);
                res.json({success: false, error: err});

              } else if (sources) {
                result.sources = [];

                // console.log(sources);

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
                      if (negation.isHoax) {
                        result.sources.push({ source: source, similarity: simVal, negation: negation });
                      }
                    }
                  });
                });

                // check for every sentence in the content for every sentence in the input
                const parsedInput = input.split('\n');
                if (parsedInput.length > 1) {
                  sources.map((source) => {
                    const sentences = source.hoax.split('\n');
                    sentences.map((sentence) => {
                      let trimmed = sentence.replace('HOAX: ', '');
                      trimmed.replace('HASUT: ', '');
                      trimmed.replace('FITNAH: ', '');
                      trimmed.replace('MISINFORMASI: ', '');
                      parsedInput.map((item) => {
                        const simVal = similarityCheck.averagedSimilarity(item, trimmed).value;
                        if (simVal >= simValTbh) {
                          const negation = negationCheck(input, sentence);
                          if (negation.isHoax) {
                            result.sources.push({ source: source, similarity: simVal, negation: negation });
                          }
                        }
                      });
                    });
                  });
                }

                if (result.sources.length > 0) {

                  console.log('Found similar entry in tbh!');
                  // hoax is found in tbh database, return the relevant entry

                  const tbh = [];


                  result.sources.map((source) => {
                    let item = {
                      name: source.source.title,
                      description: source.source.hoax,
                      similarity: source.similarity,
                      negation: source.negation,
                      url: source.source.url
                    };
                    tbh.push(item);
                  });

                  res.json({
                    success: true,
                    posts: result.posts,
                    sources: tbh,
                    result: {
                      remark: 'Hasil pencarian mengindikasikan terverifikasi sebagai Hoax',
                      conclusion: 'Kemungkinan Besar Hoax'
                    }
                  });

                } else {
                  console.log('No similar entry in tbh, continue to check bing news!');
                  // check for indications in input string
                  result.indications = {};
                  result.indications = rules.check(input);

                  // hoax is not found in tbh database, search the news
                  axios.post(`${url}api/source/news`, {word: input})
                    .then((response) => {
                      console.log('done fetching news.');
                      const newsSearchResult = response.data.record;
                      let minSimVal = simValNews;
                      let relevantNews = [];
                      console.log('checking the news for relevance and negations..');
                      newsSearchResult.map((news) => {
                        news.isUrlReputable = true;
                        // console.log('processing news');
                        news.negation = newsNegationCheck(input, news.name);
                        // console.log(news.negation);
                        if (Number(news.similarity) >= minSimVal) {
                          relevantNews.push(news);
                        }
                      });
                      console.log('done checking relevance and negations');

                      if (relevantNews.length > 0) {
                        console.log('Found relevant news search result.');

                        // relevant news from reputable sources are found
                        result.sources = relevantNews;

                        // combine the relevant news with feedback from users
                        axios.get(`${url}api/source/feedback`)
                          .then((response) => {
                            console.log('user feedback has been fetched.');
                            console.log(response.data);
                            response.data.feedbacks.map((feedback) => {
                              relevantNews.map((source) => {

                                if (String(feedback.name) === String(source.name)) {
                                  console.log('feedback name matches!');
                                  source.feedback = feedback;
                                }
                              });
                            });

                            console.log('finished checking user feedback.');

                            let final = {
                              success: true,
                              posts: result.posts,
                              sources: relevantNews,
                              indications: result.indications
                            };

                            console.log('summarizing result..');
                            final.result = summarizer(final);

                            res.json(final);

                          })
                          .catch((err) => {
                            console.log('error combining news with feedback');
                            res.json({success: false, error: err});
                          });

                      } else {

                        console.log('No result under category News.');

                        // cannot find any relevant entry under news category
                        // search the web
                        axios.post(`${url}api/source/web`, {word: input})
                          .then((response) => {

                            console.log('done fetching uncategorized web search');
                            let searchResult = response.data.record;
                            // console.log(searchResult);

                            // check the url reputation
                            axios.get(`${url}api/source/news-source`)
                              .then((response) => {

                                const reputable = response.data.sources[0].reputable;
                                const blacklist = response.data.sources[0].nonReputable;

                                let checkedWebSources = webCheck(searchResult, reputable, blacklist);

                                // combine with user feedback
                                let relevantWeb = [];
                                axios.get(`${url}api/source/feedback`)
                                  .then((response) => {
                                    console.log('done fetching user feedback for web search result');
                                    // console.log(response.data);
                                    response.data.feedbacks.map((feedback) => {
                                      checkedWebSources.sources.map((source) => {
                                        // console.log('source name: ', source.name);
                                        // console.log('feedback name: ', feedback.name);
                                        if (String(feedback.name) === String(source.name)) {
                                          source.feedback = feedback;
                                          // relevantWeb.push(source);
                                          // console.log(source);
                                        }
                                      });
                                    });


                                    let minSimVal = simValWeb;
                                    
                                    checkedWebSources.sources.map((news) => {
                                      news.negation = newsNegationCheck(input, news.name);
                                      if (Number(news.similarity) >= minSimVal) {
                                        relevantWeb.push(news);
                                      }
                                      if (news.feedback) {
                                        relevantWeb.push(news);
                                      }
                                    });

                                    if (relevantWeb.length > 0) {

                                      // relevant web entry found
                                      console.log('Found relevant entries from uncategorized web search');
                                      // res.json({success: true, sources: relevantWeb, indications: result.indications});
                                      const relevantWebCheck = webCheck(relevantWeb, reputable, blacklist)
                                      let final = {
                                        success: true,
                                        posts: result.posts,
                                        sources: checkedWebSources.sources,
                                        reputable: relevantWebCheck.reputable,
                                        blacklist: relevantWebCheck.blacklist,
                                        nonReputable: relevantWebCheck.nonReputable,
                                        indications: result.indications
                                      };

                                      final.result = summarizer(final);

                                      res.json(final);

                                    } else {

                                      // relevant web entry not found
                                      let final = {
                                        success: true,
                                        posts: result.posts,
                                        sources: checkedWebSources.sources,
                                        reputable: checkedWebSources.reputable,
                                        blacklist: checkedWebSources.blacklist,
                                        nonReputable: checkedWebSources.nonReputable,
                                        indications: result.indications,
                                        result: {
                                          remark: `Pencarian tidak dapat menemukan hasil yang relevan`,
                                          conclusion: `Tidak Dapat Disimpulkan`
                                        }
                                      };

                                      // final.result = summarizer(final);

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
                      console.log('error somewhere in news search.');
                      res.json({success: false, error: err});
                    });
                }

              } else {
                res.json({error: 'entah apa yang terjadi'});
              }

            });

          })
          .catch((err) => {
            console.log('Error in fetching users posts');
          });

      } else {
        res.json({success: false, error: 'input is not valid'});
      }
    } else {
      res.json({success: false, error: 'input must not be empty'});
    }
  } else {
    res.json({success: false, error: 'input must not be empty'});
  }
}

module.exports = hoaxChecker;
