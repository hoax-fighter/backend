const webCheck = (foundSources, reputableSources, nonReputableSources) => {

    let positiveValue = 0
    let negativeValue = 0

    let analyzedSources = foundSources;

    analyzedSources.map(source => {
        source.isUrlReputable = false;
        reputableSources.map(reputable => {
            let pattern = new RegExp(reputable, "gi")
            if (pattern.test(source.url)) {
                positiveValue += 1;
                source.isUrlReputable = true;
            }
        })
    })

    analyzedSources.map(source => {
        nonReputableSources.map(reputable => {
            let pattern = new RegExp(reputable, "gi")
            if (pattern.test(source.url)) {
                negativeValue += 1;
                source.isUrlReputable = false;
            }
        })
    })

    return {
        reputable: positiveValue,
        blacklist: negativeValue,
        nonReputable: analyzedSources.length - positiveValue - negativeValue,
        sources: analyzedSources
    };

}

module.exports = webCheck
