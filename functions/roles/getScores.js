/**
 *
 * @param {Object} role
 * @param {Object} candidate
 * @returns {Number} score
 */
const getScores = (role, candidate) => {
  const behaviorAttributesScore = calculateTagScore(
    candidate.behaviorAttributes,
    role.behaviourAttributesStrengths
  );

  const technicalSkillsScore = calculateTagScore(
    candidate.technicalSkills,
    role.technicalSkills
  );

  const jobValuesScore = calculateTagScore(candidate.jobValues, role.jobValues);

  const rolesOfInterestsScore = calculateTagScore(
    candidate.rolesOfInterests,
    role.rolesOfInterests
  );

  const locationScore = calculateTagScore(candidate.location, role.location);

  const score =
    (behaviorAttributesScore +
      technicalSkillsScore +
      jobValuesScore +
      rolesOfInterestsScore +
      locationScore) /
    5;

  return score;
};

const calculateTagScore = (candidateField, roleField) => {
  if (Array.isArray(candidateField) && Array.isArray(roleField)) {
    if (!candidateField.length || !roleField.length) return 0;

    const intersection = roleField.filter((x) => candidateField.includes(x));

    return Math.round((intersection.length * 100) / roleField.length);
  }

  if (typeof candidateField === 'string' && typeof roleField === 'string') {
    if (candidateField.toLowerCase() !== roleField.toLowerCase()) return 0;

    return 100;
  }

  return 0;
};

exports.getScores = getScores;
