let axios = require('axios');
let cheerio = require('cheerio');

// let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';
// let base_url = 'https://www.turnbackhoax.id/2017/03/';
let base_url = 'https://www.turnbackhoax.id/2017/02/';

axios.get(base_url).then((response) => {
    let $ = cheerio.load(response.data);
    let kurs = [];
    $('a', '.entry-title').each((i, elm) => {
        kurs.push({
            title: $(elm).text().trim(),
            href: $(elm).attr('href')
        });
    });
    return (kurs);
})
    .then((kurs) => {
        console.log(kurs[0].title);
    });


