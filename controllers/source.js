var Bing = require('node-bing-api')({ accKey: "7cfeae3d1999482fb0c8fb6c8c7e77e4" });

const Source = require('../models/source');
const methods = {};

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
  console.log(req.body.source)
  Source.create({
    title: req.body.title,
    hoax: req.body.hoax,
    fact: req.body.fact
  }, (err, source) => {
    if (err) {
      res.json({ error: err, success: false });
    } else {
      res.json({ source: source, success: true });
    }
  })
}

methods.web = (req, res, next) => {
  Bing.web(req.body.word, {
    count: 10,
  }, function (error, result, body) {
    if (error) {
      res.json({
        error: error,
        success: false,
        message: 'Cari Web Gagal'
      })
    } else {
      res.json({
        error: null,
        success: true,
        record: body.webPages.value,
        message: 'Cari Web Berhasil'
      })
    }

  });
}

methods.news = (req, res, next) => {
  Bing.news(req.body.word, {
    market: 'en-ID',
    top: 10
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
          obj.name = arr.name
          obj.url = arr.url
          obj.description = arr.description
          obj.provider = arr.provider[0].name
          obj.datePublished = arr.datePublished
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

module.exports = methods;