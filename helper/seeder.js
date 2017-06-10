const axios = require('axios');
const newsSourceEndPoint = 'http://localhost:4000/api/source/news-source';
const methods = {};

const source = [

  ['kompas',
  'detik',
  'okezone',
  'liputan6',
  'metrotv',
  'metrotvnews',
  'tribun',
  'tribunnews',
  'mediaindonesia',
  'republika',
  'tempo',
  'antara',
  'bbc.com/indonesia',
  'pikiran-rakyat',
  'suaramerdeka',
  'jawapos',
  'turnbackhoax',
  'gatra'],

  ["youtube",
  "blogspot",
  "kaskus",
  "wordpress",
  "facebook",
  "galaksiberita",
  "pelangimuslim.com",
  "sukasaya.com",
  "nugarislurus.com",
  "nusantarakini.com",
  "jelasberita.com"
  ]

]

