import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";

export default {
  // cache: false,
  input: "./src/index.ts",
  output: {
    format: "cjs",
    dir: "dist",
  },
  plugins: [
    eslint(),

    typescript({
      tsconfig: "./tsconfig.prod.json",
      rollupCommonJSResolveHack: true,
      objectHashIgnoreUnknownHack: true,
      clean: true,
    }),

    // autoExternal(),

    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      exclude: "node_modules/**",
    }),
  ],
};
