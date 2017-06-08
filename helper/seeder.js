const axios = require('axios');
const sourceEndPoint = 'http://localhost:3000/api/source';
// const title = require('../scrap');
const methods = {};

let titles = [
  'HOAX: Kerjasama Dengan Tiongkok Membuat Rel Kereta Cepat Di Uni Emirat Arab Dapat Hadiah Jutaan Pil Ekstasi',
  'HASUT: Foto-foto Provokasi Atas Nama Emy Natalinda Gumulja',
  'HASUT: Malaysia Ada, Mana Indonesia?',
  'HOAX: Hari Ini Ditemukan Bayi Diantara Reruntuhan, Subhanallah, Bayinya Masih Hidup #SavePidieJaya #SaveAceh',
  'HASUT: Bendera Pada Foto Presiden Dan Wakil Presiden Berwarna Merah',
  'HOAX: Ahok Ziarah Ke Makam Ibu Angkatnya Memakai Sepatu',
  'HOAX: Jutaan Burung Ini Tiba-Tiba Saja Berkumpul Memenuhi Pantai Di Dubai',
  'HASUT : Poster Welcome To North Sulawesi (Dan Bahasa Mandarin)',
  'HOAX : Selebaran Aksi 4 Desember 2016 #KitaIndonesia',
  'HASUT: “Di Menado sudah berkibar bendera PKI…”',
  'HOAX: Melayu Singapura: “Negeri Kami Diambil Orang”',
  'HOAX: Penculikan Di Bekasi Oleh Wanita Memakai Mukena Putih',
  'FITNAH: Beredar Foto Wefie Kapolri dengan Ahoker, Netizen Pertanyakan Netralitas Tito Karnavian',
  'HASUT: Instagram “Awasi Kaum Sipit Dan Pesek”',
  'HOAX: Keberangkatan Puluhan Umat Se-Jabar (Tanggal 30 November 2016) Untuk Aksi Bela Islam Jilid 3 Yang Dipimpin Oleh KH Gymnastiar',
  'HOAX: Pasukan Turki Menangkap Biksu Buddha Pembantai Muslim Myanmar',
  'HOAX: Vaksin Kanker Serviks Menyebabkan Menopause Dini',
  'HOAX: Gempa Bumi Melanda Myanmar Karena Penderitaan Muslim Rohingya',
  'HOAX: Bahaya Tanaman Penyebab Leukimia',
  'HASUT: Negaraku Sudah Dimakar! (Foto Mobil Avanza Putih Dengan Plat Asing)',
  'HOAX: Belanja Di Indomaret / Alfamart Dipotong 100 Rupiah Untuk Donasi Kampanye Ahok',
  'HASUT: Menertawakan Pernyataan Polisi Soal Daya Ledak Bom Pressure Cooker',
  'HOAX: Sikat Gigi Mengandung Bulu Babi',
  'HOAX: KTP Calon Pelaku Bom Bekasi Dibuat Tahun 2004, Usia Pembuatan KTP 15 Tahun, Berlaku 9 Tahun.',
  'HASUT: Bendera China Berkibar Di Gedung Pabrik Cat Daerah Jakarta',
  'HOAX: Mobil Ditempel Stiker Logo Palu Arit',
  'HOAX: Ahok Melakukan Kristenisasi Di DKI Dengan Menggunakan APBD',
  'HOAX: Lembaga Anti Hoax Koq Akan Dibuat Mabes Polri Bersama Teman #ahok?',
  'HASUT: Bravo Jokowi, Bravo Ahok (Makin Menjamur, PSK Amoy Asal Cina di Jakarta Raup Rp 40 Miliar/Bulan)',
  'HOAX: Sebelum Tahun 1960 Tak Pernah Dijumpai Nama Hari Yang Bertuliskan Minggu Selalu Tertulis Hari Ahad',
  'HASUT: Aceh Boikot Nasdem, Surya Paloh Atau Surya Paleh Penghianat Agama',
  'HOAX: Paus Yohanes II Masuk Islam',
  'HOAX: Masa Aksi Kita Indonesia Mencapai 100 Juta Orang (Metro TV)',
  'HOAX: Foto Warga Palestina Berkumpul Ikut Dalam Aksi 212 Di Palestina',
  'HOAX: Pria Mabuk Penenteng Golok Pada Aksi 212 Tewas Di Tahanan Polisi',
  'HOAX: Dari Turki Menyapa Aksi Super Damai Indonesia #penjarakanahox',
  'HASUT: Biarlah Foto Ini yang Berbicara (Antara Nachrowi, Sylviana & Rizieq)',
  'HOAX: Tito Karnavian Dan Ahok Minum Miras Bersama',
  'HOAX: Boikot Sari Roti Yang Ganti Nama Jadi Garmelia',
  'HASUT: Tulisan “Indonesia” Di Uang Rupiah Emisi 2016 Seperti Senjata',
  'HOAX: Teman Ahok Akan Bunuh Diri Jika Kalah Di Pilkada (Screenshot TV)',
  'HOAX: LSM Preman Dijamu Pembina Preman Kapolda Jabar (Foto Makan Bersama)',
  'HOAX: Biskuit Mudah Terbakar Karena Mengandung Lilin',
  'HOAX: Temuan Money Politic Paslon 2 (Foto Tiga Ibu Memegang Amplop Berisi Uang)',
  'HOAX: Gedung Putih Dibanjiri Massa Pro Ahok Menuntut FPI Dibubarkan',
  'HOAX: Alm. Ust. Suratman Meninggal Dunia Setelah Dikeroyok Kader GMBI',
  'HOAX: Jokowi Terobos Kebakaran Pasar Senen Pedagang Teriak Pencitraan',
  'HOAX: Kalijodoh Dimiliki Oleh Sinarmas Land',
  'HOAX: Foto Santri Berbaris Bergandengan Tangan Dengan Tulisan “Mendukung FPI Dan Ulama Yang Di Dzolimi”',
  'HOAX: Foto Hitam Putih Tentara Mengibarkan Bendera Dengan Logo “Komunis” Dan Uang Pecahan 100 Ribu Rupiah',
  'HOAX: Ceramah Panglima TNI Gatot Nurmantyo Pada Acara Maulid',
  'HASUT: Air Mineral Yang Membundel Sari Roti Juga Mesti Diboikot',
  'HOAX: Korban Om Telolet Om',
  'HASUT: Stand Indonesia Di Dubai Stylenya China',
  'HOAX: Ahok Kabur Untuk Menghindari Amukan Warga',
  'HOAX: MyRoti Adalah Kloningnya Sari Roti',
  'HOAX: Minuman White Koffie Mengandung Babi',
  'HASUT: Cut Meutia Digambarkan Tidak Berjilbab Dan Mirip Cina Di Uang Rupiah Baru',
  'HOAX: Kontrak Politik Anies Baswedan Untuk Pimpin Jakarta Dengan Nilai Syariat Islam',
  'HOAX: Penculikan Anak Untuk Jual Organ Tubuh',
  'HOAX: Alm. KH. Hasyim Muzadi Adzan Subuh Sebelum Wafat',
  'HOAX: Indonesia Siaga 1 Setelah Pilkada, Tentara Cina Komunis Akan Makar',
  'HOAX: Meme Gus Mus',
  'HOAX: Pendukung Ahok Tidak Paham Sholat Jenazah Tidak Pakai Ruku’',
  'HOAX: Foto Jokowi Shalat Jenazah Pakai Duduk',
  'MISINFORMASI: Foto Putri Arab Berbusana Tradisional Bali',
  'HOAX: Meme Anggaran Kemendikbud 400 Trilyun',
  'HOAX: Video Cindera Mata Raja Salman Untuk Ibu Iriana Jokowi Yang Diserahkan Ke KPK',
  'HOAX: PGI Siap Berkati Jasad Muslim Pendukung Ahok Yang Tidak Diurus Oleh Muslim',
  'HOAX: Meme Pesan Gus Dur Sebelum Wafat',
  'HOAX: Foto Salam Tiga Jari Raja Salman',
  'HOAX: Daftar Obat Terlarang BPOM (Kop Surat RS Siloam)',
  'HOAX: Klaim Ahok Bersalaman Dengan Raja Salman Adalah Hoax',
  'HOAX: Penggerebekan KPK Dan Polri Di Rumah Anies Baswedan',
  'HOAX: Ahok Dan Pendukungnya Alami Masalah Otak',
  'HOAX: Ahok Resmi Dihukum Pancung',
  'FITNAH: Dana Santunan Korban Crane Sudah Cair Tapi Belum Disalurkan',
  'HASUT: Terjemahan Koran Berbahasa Arab Bahwa Indonesia Kurang Bertata Krama Terhadap Raja Salman',
  'HOAX: Parasetamol Mengandung Virus',
  'HOAX: Foto Bambang Tri Kondisi Terbaru',
  'HASUT: Foto-Foto Aparat Bersenjata Di Jakarta',
  'HOAX: Banjir Di Depan Istana',
  'HOAX: KPU Dipimpin Ainun Najib Dan Servernya Dikendalikan Dari Singapura',
  'HOAX: Cumi-cumi Raksasa Di Meulaboh',
  'HOAX: Video Simulasi Hacking Manipulasi Suara Pilgub DKI 2017',
  'HOAX: AOCT, Hackers Yang Mengganti Data Paslon 3',
  'HOAX: Arab Saudi Ancam Skorsing Haji Indonesia Jika Kasus Penista Agama Tidak Dihukum Setimpal',
  'HOAX: Istana Melarang Sholat (Di Mesjid Baiturrahim Istana)',
  'HASUT: Istri Ahok: Pribumi Indonesia Jadi Rakyat Aja Ngerepotin, Apalagi Jadi Pemimpin!',
  'HOAX: Website KPU Gampang Jebol Karena Scriptnya Telanjang',
  'HOAX: Gatot Nurmantyo Akan Menghabisi Oknum PKI Walaupun Joko Widodo Melarang Dan Berisiko Dipecat Sebagai Panglima TNI',
  'HOAX: Penonaktifan Ahok Presiden Menunggu Isyarat Dari Investor Reklamasi (Foto)',
  'HOAX: Istana Adalah Pelaku Manipulasi Data',
  'HOAX: Sapi Hasil Persilangan Dengan Babi',
  'HOAX: Mujahid Cyber Membela KPU Dari Serangan Hacker Ahok',
  'HOAX: Yang Benci FPI Ada Lima (Foto Gus Mus)',
]

methods.seederOfTitle = () => {
  titles.map((val, idx) => {
  axios.post(sourceEndPoint, {
    // console.log(val)
    title: val
  }).then(res => {
    console.log(res.data)
  })
})
}

methods.seederOfTitle();
