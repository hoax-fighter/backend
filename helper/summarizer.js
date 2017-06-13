// input structure:
// data = {
//   posts: {
//     hoaxVoteCount,
//     nonHoaxVoteCount,
//   },
//   sources: {
//     hasil,
//     name,
//     url,
//     isUrlReputable,
//     description,
//     feedback: {
//       hoaxVoteCount,
//       nonHoaxVoteCount
//     }
//   },
//   indications: {
//     status,
//     summary
//   }
// }

const summarizer = (data) => {

  console.log(data);

  const indication = 1;
  if (data.indications.summary) {
    indication = 0;
  }

  const totalEntries = data.sources.length + data.posts.length;
  let ratedSources = data.sources;
  ratedSources.map((source) => {
    if (source.isUrlReputable) {
      source.acceptable = true;
    } else {
      source.acceptable = false;
    }
  });

  ratedSources.map((source) => {
    if (source.feedback) {
      if (source.feedback.nonHoaxVoteCount >= source.feedback.hoaxVoteCount) {
        source.acceptable = true;
      }
    }
  });

  let acceptable = 0;
  ratedSources.map((sources) => {
    if (sources.acceptable) {
      acceptable ++;
    }
  });

  data.posts.map((post) => {
    if (post.nonHoaxVoteCount >= post.hoaxVoteCount) {
      acceptable ++;
    }
  });

  let result = {};
  const score = Math.floor(indication*15 + (acceptable/totalEntries)*85);
  if (score > 50) {
    result.remark = `${score}% hasil pencarian mengindikasikan Fakta`;
    if (score > 85) {
      result.conclusion = `Kemungkinan Besar Fakta`;
    } else {
      result.conclusion = `Kemungkinan Fakta`;
    }
  } else {
    result.remark = `${100-score}% hasil pencarian mengindikasikan Hoax`;
    if (100-score > 85) {
      result.conclusion = `Kemungkinan Besar Hoax`;
    } else {
      result.conclusion = `Kemungkinan Hoax`;
    }
  }
  return result;
}

module.exports = summarizer;
