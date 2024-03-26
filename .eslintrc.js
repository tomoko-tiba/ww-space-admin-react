module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint'),'plugin:prettier/recommended'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules:{
  }
};
