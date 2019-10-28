import { readTextFile, writeTextFile } from "../lib/file";
import { generateEnvObjFor } from "../lib/generate-env";
import * as envs from "../../src/constants/from-env";

const file = "dist/index.js";

let content: string = readTextFile(file);

if (content.startsWith('"use strict"') || content.startsWith("'use strict'")) {
  const strictStmt = content.match(/^['"]use strict['"];?\n?/);
  if (strictStmt) {
    content = content.slice(strictStmt[0].length);
  }
}

const { environment, names } = generateEnvObjFor(envs);

const prepend = `\
'use strict';
const process = {
  env: {
${names
  .map(
    name => `    ${JSON.stringify(name)}: ${JSON.stringify(environment[name])}`,
  )
  .join(",\n")}
  }
}
const navigator = {
  userAgent: "(CloudFlare workers) Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
};
`;

writeTextFile(file, prepend + content);
