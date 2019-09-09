import * as glob from "glob";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import autoExternal from "rollup-plugin-auto-external";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import visualizer from "rollup-plugin-visualizer";

const entries = [...glob.sync("src/*.ts"), ...glob.sync("src/*/index.ts")];

const namedExports = {};

export default {
  // cache: false,
  input: entries,
  output: {
    format: "cjs",
    dir: "dist/iam-service",
  },
  plugins: [
    eslint(),

    bundle && resolve(),

    typescript({
      tsconfig: "./tsconfig.prod.json",
      rollupCommonJSResolveHack: true,
      objectHashIgnoreUnknownHack: true,
      clean: true,
    }),

    bundle
      ? commonjs({
          include: /node_modules/,
          namedExports,
        })
      : autoExternal(),

    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      exclude: "node_modules/**",
    }),

    min && terser(),

    !(visualHtmlFile in generatedVisual) &&
      visualizer({
        filename: (generatedVisual.visualHtmlFile = visualHtmlFile),
      }),
  ].filter(_ => _),
};
