export interface StackConfig {
  version: string;
  functions: Record<string, StackFunctionConfig>;
}

export interface StackFunctionConfig {
  environment_file: string;
  handler: string;
}
