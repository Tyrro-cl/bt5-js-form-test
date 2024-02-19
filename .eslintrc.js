module.exports = {
  extends: ['airbnb-base'],
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'object-curly-newline': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-new': 0,
    'no-param-reassign': ['error', {
      props: false,
    }],
  },
};
