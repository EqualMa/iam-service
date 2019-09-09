/* eslint-env node */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  globals: {
    "ts-jest": {
      // tsConfig: "tsconfig.test.json",
      babelConfig: true,
    },
  },
};
