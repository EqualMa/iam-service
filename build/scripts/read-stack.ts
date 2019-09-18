import { readYaml } from "../lib/file";
import { StackConfig } from "../lib/stack";

export const stack: StackConfig = readYaml<StackConfig>("./stack.yml");

export const functionNames: string[] = Object.keys(stack.functions);
