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
  ],
};
