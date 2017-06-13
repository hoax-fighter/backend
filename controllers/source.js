// key 1 : ee345000549e429db28e3380268d2660
// key 2 : 883fb052a88c4dae89a5da2c78de84b9
var Bing = require('node-bing-api')({ accKey: "903b2ff8e1e94edfa0db68e9d5d8a6aa" });

const Source = require('../models/source');
const methods = {};

const webCheck = require('../helper/webCheck')

const similarityCheck = require('../helper/similarityCheck')

methods.gets = (req, res, next) => {
  Source.find({}, (err, source) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ sources: source, success: true });
    }
  })
}

methods.create = (req, res, next) => {
  Source.create({
    title: req.body.title,
    hoax: req.body.hoax,
    fact: req.body.fact,
    url: req.body.url,
  }, (err, source) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ source: source, success: true });
    }
  })
}

methods.web = (req, res, next) => {
  const input = String(req.body.word);
  Bing.web(input, {
    market: 'en-ID',
    count: 25,
  }, function (error, result, body) {
    if (error) {
      res.json({
        error: error,
        success: false,
        message: 'Cari Web Gagal'
      })
    } else {
      // webCheck(body.webPages.value)

      let obj = {}
      let arr1 = []
      body.webPages.value.map(function (arr) {
        var hasil = similarityCheck.averagedSimilarity(arr.name, req.body.word)
        if (hasil.status == 'success') {
          obj.similarity = hasil.value
        }
        obj.id = arr.id;
        obj.provider = arr.displayUrl;
        obj.name = arr.name;
        obj.bingUrl = arr.url;
        obj.dateLastCrawled = arr.dateLastCrawled;
        obj.url = arr.displayUrl;
        obj.description = arr.snippet;

        const parsedInput = input.split('. ');
        if (parsedInput.length > 1) {
          const sentences = obj.description.split('. ');
          sentences.map((sentence) => {
            parsedInput.map((item) => {
              const similarity = similarityCheck.averagedSimilarity(item, sentence);
              if (similarity > obj.similarity) {
                obj.similarity = similarity;
              }
            });
          });
        }

        arr1.push(obj)

        obj = {}
      })

      res.json({
        success: true,
        record: arr1,
        message: 'Cari Web Berhasil'
      })
    }

  });
}

methods.news = (req, res, next) => {
  console.log('in news fetch controller');
  const input = String(req.body.word);
  Bing.news(String(input), {
    market: 'en-ID',
    count: 25
  },
    function (error, result, body) {

      if (error) {
        res.json({
          success: false,
          error: error,
          message: 'Cari Berita Gagal'
        })
      } else {

        let obj = {}
        let arr1 = []
        body.value.map(function (arr) {
          var hasil = similarityCheck.averagedSimilarity(arr.name, req.body.word)
          if (hasil.status == 'success') {
            obj.similarity = hasil.value
          }
          obj.name = arr.name
          obj.url = arr.url
          obj.description = arr.description
          obj.provider = arr.provider[0].name
          obj.datePublished = arr.datePublished

          const parsedInput = input.split('. ');
          if (parsedInput.length > 1) {
            const sentences = obj.description.split('. ');
            sentences.map((sentence) => {
              parsedInput.map((item) => {
                const similarity = similarityCheck.averagedSimilarity(item, sentence);
                if (similarity > obj.similarity) {
                  obj.similarity = similarity;
                }
              });
            });
          }

          arr1.push(obj)

          obj = {}
        })

        res.json({
          success: true,
          record: arr1,
          message: 'Cari Berita Berhasil'
        })
      }

    });
}

methods.delete = (req, res, next) => {
  Source.remove({}, function (err) {
    res.json({ status: 'success', message: 'database is now empty' });
  })
}

module.exports = methods;
