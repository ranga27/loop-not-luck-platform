module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  rules: { 'import/prefer-default-export': 'off' },
};
