import * as glob from "glob";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import autoExternal from "rollup-plugin-auto-external";
import { eslint } from "rollup-plugin-eslint";
import generatePackageJson from "rollup-plugin-generate-package-json";
import copy from "rollup-plugin-copy";

const entries = [
  ...glob.sync("src/*.ts", { ignore: "**/*.d.ts" }),
  ...glob.sync("src/*/index.ts"),
];

export default {
  // cache: false,
  input: entries,
  output: {
    format: "cjs",
    dir: "dist/iam-service",
  },
  external: ["body-parser"],
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

    copy({
      targets: [{ src: "stack.yml", dest: "dist" }],
    }),

    generatePackageJson({
      outputFolder: "dist/iam-service",
    }),
  ],
};
