let axios = require('axios');
let cheerio = require('cheerio');
let test = require('./similarityCheck');
let rules1 = require('./hoaxRulesCheck');

// let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';
// let base_url = 'https://www.turnbackhoax.id/2017/03/';
let base_url = 'https://www.turnbackhoax.id/2017/02/';
// https://www.turnbackhoax.id/2017/03/
// https://www.turnbackhoax.id/2017/01/
// https://www.turnbackhoax.id/2017/01/page/2/
// https://www.turnbackhoax.id/2016/12/
// https://www.turnbackhoax.id/2016/12/page/2/
let arrOfUrl = ['https://www.turnbackhoax.id/2017/01/',
	'https://www.turnbackhoax.id/2017/01/page/2/',
	'https://www.turnbackhoax.id/2017/02/',
	'https://www.turnbackhoax.id/2017/03/',
	'https://www.turnbackhoax.id/2016/12/',
	'https://www.turnbackhoax.id/2016/12/page/2/'
]

arrOfUrl.map((val, idx) => {
	axios.get(val).then((response) => {
			let $ = cheerio.load(response.data);
			let source = [];
			$('a', '.entry-title').each((i, elm) => {
				source.push({
					title: $(elm).text().trim(),
					href: $(elm).attr('href')
				});
			});
			return (source);
		})
		.then((source) => {
			let userInput = 'Banjir Di Depan Istana';
			source.map((val, idx) => {
				let hoaxRegex = /(HOAX:)/g;
				if (hoaxRegex.test(val.title)) {
					let tempArr = val.title.split(': ');
					console.log('jarowinkler', test.methods.jarowinkler(tempArr[1], userInput));
					console.log('levenshtein', test.methods.levenshtein(tempArr[1], userInput));
					console.log('expressive', rules1.expressive(tempArr[1]));
					console.log('exclamation', rules1.exclamation(tempArr[1]));
					console.log('capital', rules1.capital(tempArr[1]));
				}
			})
		});
})