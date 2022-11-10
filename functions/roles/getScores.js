const getScores = (data) => {
  const { candidateTags, companyTags } = data;
  if (companyTags && candidateTags) {
    const intersection = companyTags.filter((x) => candidateTags.includes(x));
    return Math.round((intersection.length * 100) / companyTags.length);
  }
  return 0;
};
exports.getScores = getScores;
