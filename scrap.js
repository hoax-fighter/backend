let axios = require('axios');
let cheerio = require('cheerio');
let test = require('./similarityCheck');
let rules1 = require('./hoaxRulesCheck');
const methods = {};
let result = [];

let base_url = 'https://www.turnbackhoax.id/2017/02/';
let arrOfMonth = ['https://www.turnbackhoax.id/2017/01/',
	'https://www.turnbackhoax.id/2017/01/page/2/',
	'https://www.turnbackhoax.id/2017/02/',
	'https://www.turnbackhoax.id/2017/03/',
	'https://www.turnbackhoax.id/2016/12/',
	'https://www.turnbackhoax.id/2016/12/page/2/'
]

methods.seedSource = () => {
	let results = [];

	arrOfMonth.map((val, idx) => {
		axios.get(val).then((response) => {
			let $ = cheerio.load(response.data);
			let source = [];
			$('.entry-title').each((i, elm) => {
				source.push({
					title: $(elm).text().trim(),
				});
			});
			return (source);
		})
			.then((source) => {
				source.map((val, idx) => {
					results.push({ title: val.title });
					console.log(results)
				})
			});
	})
}

module.exports = methods;