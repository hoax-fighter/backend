let axios = require('axios');
let cheerio = require('cheerio');
const methods = {};

let arrOfUrl1 = ['https://www.turnbackhoax.id/2016/11/22/fitnah-rezim-jokowi-membuat-monumen-po-an-tui-milisi-cina-pembantai-pribumi/',
    'https://www.turnbackhoax.id/2016/11/22/fitnah-grab-indonesia-mendukung-ahok/',
    'https://www.turnbackhoax.id/2016/12/22/hoax-bahaya-tanaman-penyebab-leukimia/',
    'https://www.turnbackhoax.id/2016/12/22/hasut-negaraku-sudah-dimakar-foto-mobil-avanza-putih-dengan-plat-asing/',
    'https://www.turnbackhoax.id/2016/12/22/hoax-belanja-di-indomaret-alfamart-dipotong-100-rupiah-untuk-donasi-kampanye-ahok/',
    'https://www.turnbackhoax.id/2016/12/17/hasut-menertawakan-pernyataan-polisi-soal-daya-ledak-bom-pressure-cooker/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-sikat-gigi-mengandung-bulu-babi/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-ktp-calon-pelaku-bom-bekasi-dibuat-tahun-2004-usia-pembuatan-ktp-15-tahun-berlaku-9-tahun/',
    'https://www.turnbackhoax.id/2016/12/16/hasut-bendera-china-berkibar-di-gedung-pabrik-cat-daerah-jakarta/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-mobil-ditempel-stiker-logo-palu-arit/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-ahok-melakukan-kristenisasi-di-dki-dengan-menggunakan-apbd/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-lembaga-anti-hoax-koq-akan-dibuat-mabes-polri-bersama-teman-ahok/',
    'https://www.turnbackhoax.id/2016/12/16/hasut-bravo-jokowi-bravo-ahok-makin-menjamur-psk-amoy-asal-cina-di-jakarta-raup-rp-40-miliarbulan/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-sebelum-tahun-1960-tak-pernah-dijumpai-nama-hari-yang-bertuliskan-minggu-selalu-tertulis-hari-ahad/',
    'https://www.turnbackhoax.id/2016/12/16/hasut-aceh-boikot-nasdem-surya-paloh-atau-surya-paleh-penghianat-agam/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-paus-yohanes-ii-masuk-islam/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-masa-aksi-kita-indonesia-mencapai-100-juta-orang-metro-tv/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-foto-warga-palestina-berkumpul-ikut-dalam-aksi-212-di-palestina/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-pria-mabuk-penenteng-golok-pada-aksi-212-tewas-di-tahanan-polisi/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-dari-turki-menyapa-aksi-super-damai-indonesia-penjarakanahox/',
    'https://www.turnbackhoax.id/2016/12/16/hasut-biarlah-foto-ini-yang-berbicara-antara-nachrowi-sylviana-rizieq/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-tito-karnavian-dan-ahok-minum-miras-bersama/',
    'https://www.turnbackhoax.id/2016/12/16/hoax-jutaan-burung-ini-tiba-tiba-saja-berkumpul-memenuhi-pantai-di-dubai/',
    'https://www.turnbackhoax.id/2016/12/15/hasut-poster-welcome-to-north-sulawesi/',
    'https://www.turnbackhoax.id/2016/12/15/hoax-selebaran-aksi-4-desember-2016-kitaindonesia/',
    'https://www.turnbackhoax.id/2016/12/15/di-manado-sudah-berkibar-bendera-pki/',
    'https://www.turnbackhoax.id/2016/12/15/hoax-melayu-singapura-negeri-kami-diambil-orang/',
    'https://www.turnbackhoax.id/2016/12/15/hoax-penculikan-di-bekasi-oleh-wanita-memakai-mukena-putih/',
    'https://www.turnbackhoax.id/2016/12/15/fitnah-beredar-foto-wefie-kapolri-dengan-ahoker-netizen-pertanyakan-netralitas-tito-karnavian/',
    'https://www.turnbackhoax.id/2016/12/15/hasut-instagram-awasi-kaum-sipit-dan-pesek/',
    'https://www.turnbackhoax.id/2016/12/15/hoax-keberangkatan-puluhan-umat-se-jabar-tanggal-30-november-2016-untuk-aksi-bela-islam-jilid-3-yang-dipimpin-oleh-kh-gymnastiar/',
    'https://www.turnbackhoax.id/2016/12/01/hoax-pasukan-turki-menangkap-biksu-buddha-pembantai-muslim-myanmar/',
    'https://www.turnbackhoax.id/2016/12/01/hoax-vaksin-kanker-serviks-menyebabkan-menopause-dini/',
    'https://www.turnbackhoax.id/2016/12/01/hoax-gempa-bumi-melanda-myanmar-karena-penderitaan-muslim-rohingya/',
    'https://www.turnbackhoax.id/2017/01/27/hoax-boikot-sari-roti-yang-ganti-nama-jadi-garmelia/',
    'https://www.turnbackhoax.id/2017/01/27/hasut-tulisan-indonesia-di-uang-rupiah-emisi-2016-seperti-senjata/',
    'https://www.turnbackhoax.id/2017/01/26/hoax-teman-ahok-akan-bunuh-diri-jika-kalah-di-pilkada-screenshot-tv/',
    'https://www.turnbackhoax.id/2017/01/26/hoax-lsm-preman-dijamu-pembina-preman-kapolda-jabar-foto-makan-bersama/',

];

let arrOfUrl2 = [
    'https://www.turnbackhoax.id/2017/01/26/hoax-biskuit-mudah-terbakar-karena-mengandung-lilin/',
    'https://www.turnbackhoax.id/2017/01/26/hoax-temuan-money-politic-paslon-2-foto-tiga-ibu-memegang-amplop-berisi-uang/',
    'https://www.turnbackhoax.id/2017/01/26/hoax-gedung-putih-dibanjiri-massa-pro-ahok-menuntut-fpi-dibubarkan/',
    'https://www.turnbackhoax.id/2017/01/25/hoax-alm-ust-suratman-meninggal-dunia-setelah-dikeroyok-kader-gmbi/',
    'https://www.turnbackhoax.id/2017/01/25/hoax-jokowi-terobos-kebakaran-pasar-senen-pedagang-teriak-pencitraan/',
    'https://www.turnbackhoax.id/2017/01/25/hoax-kalijodoh-dimiliki-oleh-sinarmas-land/',
    'https://www.turnbackhoax.id/2017/01/25/hoax-foto-santri-berbaris-bergandengan-tangan-dengan-tulisan-mendukung-fpi-dan-ulama-yang-di-dzolimi/',
    'https://www.turnbackhoax.id/2017/01/24/hoax-foto-hitam-putih-tentara-mengibarkan-bendera-dengan-logo-komunis-dan-uang-pecahan-100-ribu-rupiah/',
    'https://www.turnbackhoax.id/2017/01/08/hoax-ceramah-panglima-tni-gatot-nurmantyo-pada-acara-maulid/',
    'https://www.turnbackhoax.id/2017/01/08/hasut-air-mineral-yang-membundel-sari-roti-juga-mesti-diboikot/',
    'https://www.turnbackhoax.id/2017/01/08/hoax-korban-om-telolet-om/',
    'https://www.turnbackhoax.id/2017/01/08/hasut-stand-indonesia-di-dubai-stylenya-china/',
    'https://www.turnbackhoax.id/2017/01/08/hoax-ahok-kabur-untuk-menghindari-amukan-warga/',
    'https://www.turnbackhoax.id/2017/01/08/hoax-myroti-adalah-kloningnya-sari-roti/',
    'https://www.turnbackhoax.id/2017/01/08/hoax-white-koffie-mengandung-babi/',
    'https://www.turnbackhoax.id/2017/01/08/hasut-cut-meutia-digambarkan-tidak-berjilbab-dan-mirip-cina-di-uang-rupiah-baru/',
    'https://www.turnbackhoax.id/2017/01/05/hoax-kerjasama-dengan-tiongkok-membuat-rel-kereta-cepat-di-uni-emirat-arab-dapat-hadiah-jutaan-pil-ekstasi/',
    'https://www.turnbackhoax.id/2017/01/04/hasut-foto-foto-provokasi-atas-nama-emy-natalinda-gumulja/',
    'https://www.turnbackhoax.id/2017/01/03/hasut-malaysia-ada-mana-indonesia/',
    'https://www.turnbackhoax.id/2017/01/03/hoax-hari-ini-ditemukan-bayi-diantara-reruntuhan-subhanallah-bayinya-masih-hidup-savepidiejaya-saveaceh/',
    'https://www.turnbackhoax.id/2017/01/03/hasut-bendera-pada-foto-presiden-dan-wakil-presiden-berwarna-merah/',
    'https://www.turnbackhoax.id/2017/01/03/hoax-ahok-ziarah-ke-makam-ibu-angkatnya-memakai-sepatu/',
    'https://www.turnbackhoax.id/2017/02/27/hoax-parasetamol-mengandung-virus/',
    'https://www.turnbackhoax.id/2017/02/27/hoax-foto-bambang-tri-kondisi-terbaru/',
    'https://www.turnbackhoax.id/2017/02/22/hasut-foto-foto-aparat-bersenjata-di-jakarta/',
    'https://www.turnbackhoax.id/2017/02/22/hoax-banjir-di-depan-istana/',
    'https://www.turnbackhoax.id/2017/02/20/hoax-kpu-dipimpin-ainun-najib-dan-servernya-dikendalikan-dari-singapura/',
    'https://www.turnbackhoax.id/2017/02/20/hoax-cumi-cumi-raksasa-di-meulaboh/',
    'https://www.turnbackhoax.id/2017/02/19/hoax-video-simulasi-hacking-manipulasi-suara-pilgub-dki-2017/',
    'https://www.turnbackhoax.id/2017/02/19/hoax-aoct-hackers-yang-mengganti-data-paslon-3/',
    'https://www.turnbackhoax.id/2017/02/19/hoax-arab-saudi-ancam-skorsing-haji-indonesia-jika-kasus-penista-agama-tidak-dihukum-setimpal/',
    'https://www.turnbackhoax.id/2017/02/19/hoax-istana-melarang-sholat-di-mesjid-baiturrahim-istana/',
    'https://www.turnbackhoax.id/2017/02/18/hasut-istri-ahok-pribumi-indonesia-jadi-rakyat-aja-ngerepotin-apalagi-jadi-pemimpin/',
    'https://www.turnbackhoax.id/2017/02/18/hoax-website-kpu-gampang-jebol-karena-scriptnya-telanjang/',
    'https://www.turnbackhoax.id/2017/02/18/hoax-gatot-nurmantyo-akan-menghabisi-oknum-pki-walaupun-joko-widodo-melarang-dan-berisiko-dipecat-sebagai-panglima-tni/',
    'https://www.turnbackhoax.id/2017/02/18/hoax-penonaktifan-ahok-presiden-menunggu-isyarat-dari-investor-reklamasi/',
    'https://www.turnbackhoax.id/2017/02/18/hoax-istana-adalah-pelaku-manipulasi-data/',
    'https://www.turnbackhoax.id/2017/02/18/hoax-sapi-hasil-persilangan-dengan-babi/',
    'https://www.turnbackhoax.id/2017/02/18/hoax-mujahid-cyber-membela-kpu-dari-serangan-hacker-ahok/',
    'https://www.turnbackhoax.id/2017/02/14/hoax-yang-benci-fpi-ada-lima-foto-gus-mus/',
    'https://www.turnbackhoax.id/2017/03/30/hoax-kontrak-politik-anies-baswedan-untuk-pimpin-jakarta-dengan-nilai-syariat-islam/',
    'https://www.turnbackhoax.id/2017/03/30/hoax-penculikan-anak-untuk-jual-organ-tubuh/',
    'https://www.turnbackhoax.id/2017/03/25/hoax-alm-kh-hasyim-muzadi-adzan-subuh-sebelum-wafat/',
    'https://www.turnbackhoax.id/2017/03/25/hoax-indonesia-siaga-1-setelah-pilkada-tentara-cina-komunis-akan-makar/',
    'https://www.turnbackhoax.id/2017/03/15/hoax-meme-gus-mus/',
    'https://www.turnbackhoax.id/2017/03/15/hoax-pendukung-ahok-tidak-paham-sholat-jenazah-tidak-pakai-ruku/',
    'https://www.turnbackhoax.id/2017/03/15/hoax-foto-jokowi-shalat-jenazah-pakai-duduk/',
    'https://www.turnbackhoax.id/2017/03/09/misinformasi-foto-putri-arab-berbusana-tradisional-bali/',
    'https://www.turnbackhoax.id/2017/03/08/hoax-meme-anggaran-kemendikbud-400-trilyun/',
    'https://www.turnbackhoax.id/2017/03/07/hoax-video-cindera-mata-raja-salman-untuk-ibu-iriana-jokowi-yang-diserahkan-ke-kpk/',
    'https://www.turnbackhoax.id/2017/03/07/hoax-pgi-siap-berkati-jasad-muslim-pendukung-ahok-yang-tidak-diurus-oleh-muslim/',
    'https://www.turnbackhoax.id/2017/03/07/hoax-meme-pesan-gus-dur-sebelum-wafat/',
    'https://www.turnbackhoax.id/2017/03/07/hoax-foto-salam-tiga-jari-raja-salman/',
    'https://www.turnbackhoax.id/2017/03/06/hoax-daftar-obat-terlarang-oleh-bpom-kop-surat-rs-siloam/',
    'https://www.turnbackhoax.id/2017/03/06/hoax-klaim-ahok-bersalaman-dengan-raja-salman-adalah-hoax/',
    'https://www.turnbackhoax.id/2017/03/06/hoax-penggerebekan-kpk-dan-polri-di-rumah-anies-baswedan/',
    'https://www.turnbackhoax.id/2017/03/06/hoax-ahok-dan-pendukungnya-alami-masalah-otak/',
    'https://www.turnbackhoax.id/2017/03/06/hoax-ahok-resmi-dihukum-pancung/',
    'https://www.turnbackhoax.id/2017/03/05/fitnah-dana-santunan-korban-crane-sudah-cair-tapi-belum-disalurkan/',
    'https://www.turnbackhoax.id/2017/03/05/hasut-terjemahan-koran-berbahasa-arab-bahwa-indonesia-kurang-bertata-krama-terhadap-raja-salman/',
]

methods.seedData = () => {
    arrOfUrl1.map((val, idx) => {
    axios.get(val).then((response) => {
        let $ = cheerio.load(response.data);
        let source = [];
        $('.entry-content').each((i, elm) => {
            let w = ['Fakta', 'FAKTA'];
            var content1 = $(elm).children().text().trim().split('Fakta');
            var content2 = $(elm).children().text().trim().split('FAKTA');
            // let tempContent = w.map((val, idx) => {
            //     return content = $(elm).children().text().trim().split(val);
            // })
            if(content1[1] === undefined) {
                source.push({
                    hoax: content1[0],
                    fakta: content2[1]
                })
            } else {
                source.push({
                    hoax: content1[0],
                    fakta: content1[1]
                });
            }
            
        });
        return (source);
    })
        .then(source => {
            // console.log(source)
            console.log('HOAX', source[0].hoax);
            // console.log('FAKTA', source[0].fakta);
            // console.log(source.hoax);
        })
})
}

methods.seedData();

module.exports = methods;