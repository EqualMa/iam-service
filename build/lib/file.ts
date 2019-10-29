import { readFile as r, readFileSync, writeFileSync, copyFileSync } from "fs";
import { promisify } from "util";

export const readFileAsync = promisify(r);

export function readTextFileAsync(file: string): Promise<string> {
  return readFileAsync(file, "utf8");
}

export function readTextFile(file: string): string {
  return readFileSync(file, "utf8");
}

export function writeTextFile(file: string, content: string): void {
  writeFileSync(file, content);
}

import { safeLoad, safeDump } from "js-yaml";

export async function readYamlAsync<T>(file: string): Promise<T> {
  const s = await readTextFileAsync(file);
  return safeLoad(s);
}

export function readYaml<T>(file: string): T {
  const s = readTextFile(file);
  return safeLoad(s);
}

export function writeYaml<T>(obj: T, file: string) {
  const s = safeDump(obj);
  writeTextFile(file, s);
}

export function copyFile(file: string, to: string) {
  copyFileSync(file, to);
}
