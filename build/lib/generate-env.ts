export function generateEnvObjFor(envModule: Record<string, string>) {
  const obj: Record<string, string> = {};

  const names = Object.keys(envModule);
  for (const env of names) {
    if (typeof envModule[env] !== "string") {
      throw new Error(`EnvVar [${env}] is not available`);
    }
    obj[env] = envModule[env];
  }
  return { environment: obj, names };
}
