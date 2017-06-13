const webCheck = (foundSources, reputableSources, nonReputableSources) => {

    let positiveValue = 0
    let negativeValue = 0

    let analyzedSources = foundSources;

    // console.log(analyzedSources);

    analyzedSources.map(source => {
        source.isUrlReputable = false;
        reputableSources.map(reputable => {
            let pattern = new RegExp(reputable, "gi")
            if (pattern.test(source.url)) {
                // console.log('ketemu yang reputable', source.url, reputable)
                positiveValue += 1;
                source.isUrlReputable = true;
            }
        })
    })

    analyzedSources.map(source => {
        nonReputableSources.map(reputable => {
            let pattern = new RegExp(reputable, "gi")
            if (pattern.test(source.url)) {
                // console.log('ketemu yang blacklist', source.url, reputable)
                negativeValue += 1;
                source.isUrlReputable = false;
            }
        })
    })

    // console.log('ketemu positip', positiveValue);
    // console.log('ketemu negatip', negativeValue);

    return {
        reputable: positiveValue,
        blacklist: negativeValue,
        nonReputable: analyzedSources.length - positiveValue - negativeValue,
        sources: analyzedSources
    };

}

module.exports = webCheck
