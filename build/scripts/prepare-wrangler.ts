import { writeTextFile, readTextFile } from "../lib/file";

import { join } from "path";

const file = "./wrangler.toml";

const accountId = process.env["MY_CF_ACCOUNT_ID"];

const text = readTextFile(file);

const newText =
  text + (text.endsWith("\n") ? "" : "\n") + `account_id = "${accountId}"\n`;

writeTextFile(join("./dist", file), newText);
