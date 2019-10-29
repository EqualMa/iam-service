import { writeTextFile, readTextFile, copyFile } from "../lib/file";

import { join } from "path";

const dest = (f: string) => join("./dist", f);

const file = "./wrangler.toml";

const accountId = process.env["MY_CF_ACCOUNT_ID"];

const text = readTextFile(file);

const newText =
  text + (text.endsWith("\n") ? "" : "\n") + `account_id = "${accountId}"\n`;

writeTextFile(dest(file), newText);

// yarn.lock for dep cache
const lockFile = "./yarn.lock";
copyFile(lockFile, dest(lockFile));
