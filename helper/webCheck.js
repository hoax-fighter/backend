const webCheck = (webData) => {

    let positiveValue = 0
    let negativeValue = 0

    const urlBerita = ['Kompas',
        'Detik',
        'Okezone',
        'Liputan6',
        'Metrotv',
        'Metrotvnews',
        'Tribun',
        'Tribunnews',
        'Mediaindonesia',
        'Republika',
        'Tempo',
        'Antara',
        'bbc.com/indonesia',
        'Pikiran-rakyat',
        'Suaramerdeka'
    ]

    console.log(webData) // data web

    webData.map(web => {
        console.log('web', web.displayUrl)
        urlBerita.map(url => {
            console.log('url', url)
            let pattern = new RegExp(url, "gi")
            if (pattern.test(web.displayUrl)) {
                console.log('ketemu yang sama', web.displayUrl, url)
                positiveValue += 1
            }
        })
    })

    console.log('ketemu', positiveValue)

}

module.exports = webCheck

