/* eslint-env node */
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
  plugins: [
    // TODO: need?
    "syntax-dynamic-import",
    // "@babel/plugin-transform-modules-commonjs",
    // "babel-plugin-chevrotain-serialize",
    // [
    //   "babel-plugin-chevrotain",
    //   {
    //     babel: true,
    //   },
    // ],
  ],
};
