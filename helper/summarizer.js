// data = {
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

  const totalEntries = data.sources.length;
  let acceptable = 0;
  data.sources.map((source) => {
    console.log(source);
    if (source.isUrlReputable) {
      if (source.feedback) {
        if (source.feedback.nonHoaxVoteCount >= source.feedback.hoaxVoteCount) {
          acceptable ++;
        }
      } else {
        acceptable ++;
      }
    }
  });

  let result = {};
  const score = Math.floor(indication*15 + (acceptable/totalEntries)*85);
  console.log(score);
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
