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

// let arrOfPosts1 = ['https://www.turnbackhoax.id/2016/11/22/fitnah-rezim-jokowi-membuat-monumen-po-an-tui-milisi-cina-pembantai-pribumi/',
//     'https://www.turnbackhoax.id/2016/11/22/fitnah-grab-indonesia-mendukung-ahok/',
//     'https://www.turnbackhoax.id/2016/12/22/hoax-bahaya-tanaman-penyebab-leukimia/',
//     'https://www.turnbackhoax.id/2016/12/22/hasut-negaraku-sudah-dimakar-foto-mobil-avanza-putih-dengan-plat-asing/',
//     'https://www.turnbackhoax.id/2016/12/22/hoax-belanja-di-indomaret-alfamart-dipotong-100-rupiah-untuk-donasi-kampanye-ahok/',
//     'https://www.turnbackhoax.id/2016/12/17/hasut-menertawakan-pernyataan-polisi-soal-daya-ledak-bom-pressure-cooker/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-sikat-gigi-mengandung-bulu-babi/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-ktp-calon-pelaku-bom-bekasi-dibuat-tahun-2004-usia-pembuatan-ktp-15-tahun-berlaku-9-tahun/',
//     'https://www.turnbackhoax.id/2016/12/16/hasut-bendera-china-berkibar-di-gedung-pabrik-cat-daerah-jakarta/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-mobil-ditempel-stiker-logo-palu-arit/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-ahok-melakukan-kristenisasi-di-dki-dengan-menggunakan-apbd/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-lembaga-anti-hoax-koq-akan-dibuat-mabes-polri-bersama-teman-ahok/',
//     'https://www.turnbackhoax.id/2016/12/16/hasut-bravo-jokowi-bravo-ahok-makin-menjamur-psk-amoy-asal-cina-di-jakarta-raup-rp-40-miliarbulan/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-sebelum-tahun-1960-tak-pernah-dijumpai-nama-hari-yang-bertuliskan-minggu-selalu-tertulis-hari-ahad/',
//     'https://www.turnbackhoax.id/2016/12/16/hasut-aceh-boikot-nasdem-surya-paloh-atau-surya-paleh-penghianat-agam/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-paus-yohanes-ii-masuk-islam/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-masa-aksi-kita-indonesia-mencapai-100-juta-orang-metro-tv/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-foto-warga-palestina-berkumpul-ikut-dalam-aksi-212-di-palestina/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-pria-mabuk-penenteng-golok-pada-aksi-212-tewas-di-tahanan-polisi/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-dari-turki-menyapa-aksi-super-damai-indonesia-penjarakanahox/',
//     'https://www.turnbackhoax.id/2016/12/16/hasut-biarlah-foto-ini-yang-berbicara-antara-nachrowi-sylviana-rizieq/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-tito-karnavian-dan-ahok-minum-miras-bersama/',
//     'https://www.turnbackhoax.id/2016/12/16/hoax-jutaan-burung-ini-tiba-tiba-saja-berkumpul-memenuhi-pantai-di-dubai/',
//     'https://www.turnbackhoax.id/2016/12/15/hasut-poster-welcome-to-north-sulawesi/',
//     'https://www.turnbackhoax.id/2016/12/15/hoax-selebaran-aksi-4-desember-2016-kitaindonesia/',
//     'https://www.turnbackhoax.id/2016/12/15/di-manado-sudah-berkibar-bendera-pki/',
//     'https://www.turnbackhoax.id/2016/12/15/hoax-melayu-singapura-negeri-kami-diambil-orang/',
//     'https://www.turnbackhoax.id/2016/12/15/hoax-penculikan-di-bekasi-oleh-wanita-memakai-mukena-putih/',
//     'https://www.turnbackhoax.id/2016/12/15/fitnah-beredar-foto-wefie-kapolri-dengan-ahoker-netizen-pertanyakan-netralitas-tito-karnavian/',
//     'https://www.turnbackhoax.id/2016/12/15/hasut-instagram-awasi-kaum-sipit-dan-pesek/',
//     'https://www.turnbackhoax.id/2016/12/15/hoax-keberangkatan-puluhan-umat-se-jabar-tanggal-30-november-2016-untuk-aksi-bela-islam-jilid-3-yang-dipimpin-oleh-kh-gymnastiar/',
//     'https://www.turnbackhoax.id/2016/12/01/hoax-pasukan-turki-menangkap-biksu-buddha-pembantai-muslim-myanmar/',
//     'https://www.turnbackhoax.id/2016/12/01/hoax-vaksin-kanker-serviks-menyebabkan-menopause-dini/',
//     'https://www.turnbackhoax.id/2016/12/01/hoax-gempa-bumi-melanda-myanmar-karena-penderitaan-muslim-rohingya/',
//     'https://www.turnbackhoax.id/2017/01/27/hoax-boikot-sari-roti-yang-ganti-nama-jadi-garmelia/',
//     'https://www.turnbackhoax.id/2017/01/27/hasut-tulisan-indonesia-di-uang-rupiah-emisi-2016-seperti-senjata/',
//     'https://www.turnbackhoax.id/2017/01/26/hoax-teman-ahok-akan-bunuh-diri-jika-kalah-di-pilkada-screenshot-tv/',
//     'https://www.turnbackhoax.id/2017/01/26/hoax-lsm-preman-dijamu-pembina-preman-kapolda-jabar-foto-makan-bersama/',
// ];

// let arrOfPosts2 = [
    
// ]

methods.seedSource = () => {
	let results = [];

// 	arrOfPosts1.map((val, idx) => {
//     axios.get(val).then((response) => {
//         let $ = cheerio.load(response.data);
//         let source = [];
//         $('.entry-content').each((i, elm) => {
//             let w = ['Fakta', 'FAKTA'];
//             var content1 = $(elm).children().text().trim().split('Fakta');
//             var content2 = $(elm).children().text().trim().split('FAKTA');
//             // let tempContent = w.map((val, idx) => {
//             //     return content = $(elm).children().text().trim().split(val);
//             // })
//             if(content1[1] === undefined) {
//                 source.push({
//                     hoax: content1[0],
//                     fakta: content2[1]
//                 })
//             } else {
//                 source.push({
//                     hoax: content1[0],
//                     fakta: content1[1]
//                 });
//             }
            
//         });
//         return (source);
//     })
//         .then(source => {
// 						results.push({hoax: source[0].hoax})
// 						results.push({fact: source[0].fakta})
//             // console.log(source)
//             // console.log('HOAX', source[0].hoax);
//             // console.log('FAKTA', source[0].fakta);
//             // console.log(source.hoax);
//         })
// })

arrOfMonth.map((val, idx) => {
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
				// console.log(me[0]);
				source.map((val, idx) => {
					// console.log(val.title)
					results.push({title: val.title});
					console.log(results)
				})
				// console.log(source.title);
				// source.map((val, idx) => {
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

		
	// })
}

// methods.seedSource();
// console.log(result)

module.exports = methods;