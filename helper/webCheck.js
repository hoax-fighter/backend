const webCheck = (foundSources, reputableSources, nonReputableSources) => {

    let positiveValue = 0
    let negativeValue = 0

    let analyzedSources = foundSources;

    // console.log(analyzedSources);

    analyzedSources.map(source => {
      source.isUrlReputable = false;
        reputableSources.map(reputable => {
            let pattern = new RegExp(reputable, "gi")
            if (pattern.test(source.displayUrl)) {
                // console.log('ketemu yang reputable', source.displayUrl, reputable)
                positiveValue += 1;
                source.isUrlReputable = true;
            }
        })
    })

    analyzedSources.map(source => {
        nonReputableSources.map(reputable => {
            let pattern = new RegExp(reputable, "gi")
            if (pattern.test(source.displayUrl)) {
                // console.log('ketemu yang nonReputable', source.displayUrl, reputable)
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
      nonReputable: analyzedSources.length - positiveValue - negativeValue || 0,
      sources: analyzedSources
    };

}

module.exports = webCheck
