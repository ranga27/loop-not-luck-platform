const getScores = (data) => {
  const { candidateTags, companyTags } = data;
  if (companyTags && candidateTags) {
    const intersection = companyTags.filter((x) => candidateTags.includes(x));
    return Math.round((intersection.length * 100) / companyTags.length);
  }
  // remove the Match.random return when algo is fixed
  return Math.floor(Math.random() * 99);
  // return 0
};
exports.getScores = getScores;
