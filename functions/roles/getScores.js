/**
 *
 * @param {Object} candidate
 * @param {Object} role
 * @returns {Number} score
 */
const getScores = (candidate, role) => {
  const behaviorAttributesScore = calculateTagScore(
    candidate.behaviorAttributes,
    role.behaviourAttributesStrengths
  );

  const technicalSkillsScore = calculateTagScore(
    candidate.technicalSkills,
    role.technicalSkills
  );

  const jobValuesScore = calculateTagScore(candidate.jobValues, role.jobValues);

  const score =
    (behaviorAttributesScore + technicalSkillsScore + jobValuesScore) / 3;

  return score;
};

const calculateTagScore = (candidateTags, roleTags) => {
  if (!Array.isArray(candidateTags) || !Array.isArray(roleTags)) return 0;
  if (!candidateTags.length || !roleTags.length) return 0;

  const intersection = roleTags.filter((x) => candidateTags.includes(x));

  return Math.round((intersection.length * 100) / roleTags.length);
};

exports.getScores = getScores;
