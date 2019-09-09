import * as glob from "glob";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import autoExternal from "rollup-plugin-auto-external";
import { eslint } from "rollup-plugin-eslint";

const entries = [...glob.sync("src/*.ts"), ...glob.sync("src/*/index.ts")];

export default {
  // cache: false,
  input: entries,
  output: {
    format: "cjs",
    dir: "dist/iam-service",
  },
  plugins: [
    eslint(),

    typescript({
      tsconfig: "./tsconfig.prod.json",
      rollupCommonJSResolveHack: true,
      objectHashIgnoreUnknownHack: true,
      clean: true,
    }),

    autoExternal(),

    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      exclude: "node_modules/**",
    }),
  ],
};
