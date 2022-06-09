const getScores = (role) => {
  // TODO: get actual scores implement matching algorithm based on tags in documents.
  console.log(role.id);
  return Math.floor(Math.random() * 99);
};
exports.getScores = getScores;
