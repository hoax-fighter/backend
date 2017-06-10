const webCheck = (webData, reputableSources, notReputableSources) => {

    let positiveValue = 0
    let negativeValue = 0

    // console.log(webData) // data web

    webData.map(web => {
        console.log('web', web.displayUrl)
        reputables.map(url => {
            console.log('url', url)
            let pattern = new RegExp(url, "gi")
            if (pattern.test(web.displayUrl)) {
                console.log('ketemu yang sama', web.displayUrl, url)
                positiveValue += 1
            }
        })
    })

    webData.map(web => {
        console.log('web', web.displayUrl)
        notReputableSources.map(url => {
            console.log('url', url)
            let pattern = new RegExp(url, "gi")
            if (pattern.test(web.displayUrl)) {
                console.log('ketemu yang sama', web.displayUrl, url)
                negativeValue += 1
            }
        })
    })

    console.log('ketemu positip', positiveValue);
    console.log('ketemu negatip', negativeValue);

    return {
      reputable: positiveValue,
      notReputable: negativeValue
    };
    
}

module.exports = webCheck
