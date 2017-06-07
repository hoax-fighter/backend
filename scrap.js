let axios = require('axios');
let cheerio = require('cheerio');
let test = require('./similarityCheck');

// let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';
// let base_url = 'https://www.turnbackhoax.id/2017/03/';
let base_url = 'https://www.turnbackhoax.id/2017/02/';
// https://www.turnbackhoax.id/2017/03/
// https://www.turnbackhoax.id/2017/01/
// https://www.turnbackhoax.id/2017/01/page/2/
// https://www.turnbackhoax.id/2016/12/
// https://www.turnbackhoax.id/2016/12/page/2/
// let arrOfUrl = ['https://www.turnbackhoax.id/2017/02/']

axios.get(base_url).then((response) => {
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
            if(val.te)
            console.log('jarowinkler', test.methods.jarowinkler(val.title.slice(0,), userInput));
            console.log('levenshtein', test.methods.levenshtein(val.title, userInput));
            console.log('stringSimilarity', test.methods.stringSimilarity(val.title, userInput));
        })
        console.log(source)
        // console.log(test.methods.jarowinkler(source[0].title, source[1].title));
        // console.log(test.methods.levenshtein(source[0].title, source[1].title));
        // console.log(test.methods.stringSimilarity(source[0].title, source[1].title));
    });

    // console.log(test.methods.jarowinkler('as', 'as'))
    // console.log(test.methods.levenshtein('as', 'as'))
    // console.log(test.methods.stringSimilarity('as', 'as'))


