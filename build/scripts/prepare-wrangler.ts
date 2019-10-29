import { writeTextFile, readTextFile } from "../lib/file";

const file = "./wrangler.default.toml";

const accountId = process.env["MY_CF_ACCOUNT_ID"];

const text = readTextFile(file);

const newText =
  text + (text.endsWith("\n") ? "" : "\n") + `account_id = "${accountId}"\n`;

writeTextFile("./wrangler.toml", newText);
