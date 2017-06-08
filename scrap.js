let axios = require('axios');
let cheerio = require('cheerio');
let test = require('./similarityCheck');
let rules1 = require('./hoaxRulesCheck');
const methods = {};
let result = [];

let base_url = 'https://www.turnbackhoax.id/2017/02/';
let arrOfUrl = ['https://www.turnbackhoax.id/2017/01/',
	'https://www.turnbackhoax.id/2017/01/page/2/',
	'https://www.turnbackhoax.id/2017/02/',
	'https://www.turnbackhoax.id/2017/03/',
	'https://www.turnbackhoax.id/2016/12/',
	'https://www.turnbackhoax.id/2016/12/page/2/'
]
methods.seedData = () => {
	arrOfUrl.map((val, idx) => {
		axios.get(val).then((response) => {
				let $ = cheerio.load(response.data);
				let source = [];
				$('.entry-title').each((i, elm) => {
					source.push({
						title: $(elm).text().trim(),
						// href: $(elm).attr('href')
					});
				});
				return (source);
			})
			.then((source) => {
				// console.log(source.title);
				// source.forEach((val, idx) => {
				// 	// console.log(typeof val)
				// 	axios.post('http://localhost:3000/api/source', {
				// 		source: val.title,
				// 	}).then(res => {
				// 			console.log(res.data)
				// 	})
				// })
				// console.log(result)
				// result.push(source.title);
				// console.log(result)
				// return source;
				// return source
				// let userInput = 'Banjir Di Depan Istana';
				// source.map((val, idx) => {
				// 	let hoaxRegex = /(HOAX:)/g;
				// 	if (hoaxRegex.test(val.title)) {
				// 		let tempArr = val.title.split(': ');
				// 		console.log('jarowinkler', test.methods.jarowinkler(tempArr[1].toLowerCase(), userInput.toLowerCase()));
				// 		console.log('levenshtein', test.methods.levenshtein(tempArr[1].toLowerCase(), userInput.toLowerCase()));
				// 		console.log('stringSimilarity', test.methods.stringSimilarity(tempArr[1].toLowerCase(), userInput.toLowerCase()));
				// 		// console.log('expressive', rules1.expressive(tempArr[1]));
				// 		// console.log('exclamation', rules1.exclamation(tempArr[1]));
				// 		// console.log('capital', rules1.capital(tempArr[1]));
				// 		// console.log('jarowinkler', test.methods.jarowinkler('Setelah pelaku usaha mikro, kecil, dan menengah (UMKM) keberatan, pemerintah memutuskan untuk merevisi batas minimum saldo rekening yang wajib dilaporkan ke Direktorat Jenderal (Ditjen) Pajak.', 'Setelah usaha mikro, kecil dan menengah (UMKM) keberatan atas keberatan tersebut, pemerintah memutuskan untuk merevisi saldo rekening minimum yang harus dilaporkan ke Direktorat Jenderal Pajak (DJP).'));
				// 		// console.log('levenshtein', test.methods.levenshtein('Setelah pelaku usaha mikro, kecil, dan menengah (UMKM) keberatan, pemerintah memutuskan untuk merevisi batas minimum saldo rekening yang wajib dilaporkan ke Direktorat Jenderal (Ditjen) Pajak.', 'Setelah usaha mikro, kecil dan menengah (UMKM) keberatan atas keberatan tersebut, pemerintah memutuskan untuk merevisi saldo rekening minimum yang harus dilaporkan ke Direktorat Jenderal Pajak (DJP).'));
				// 		// console.log('stringSimilarity', test.methods.stringSimilarity('Setelah pelaku usaha mikro, kecil, dan menengah (UMKM) keberatan, pemerintah memutuskan untuk merevisi batas minimum saldo rekening yang wajib dilaporkan ke Direktorat Jenderal (Ditjen) Pajak.', 'Setelah usaha mikro, kecil dan menengah (UMKM) keberatan atas keberatan tersebut, pemerintah memutuskan untuk merevisi saldo rekening minimum yang harus dilaporkan ke Direktorat Jenderal Pajak (DJP).'));
				// 	}
				// })
			});
	})
}

methods.seedData();
// console.log(result)

module.exports = methods;