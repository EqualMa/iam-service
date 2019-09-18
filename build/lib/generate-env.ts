export function generateEnvObjFor(envModule: Record<string, string>) {
  const obj: Record<string, string> = {};
  for (const env of Object.keys(envModule)) {
    if (typeof envModule[env] !== "string") {
      throw new Error(`EnvVar [${env}] is not available`);
    }
    obj[env] = envModule[env];
  }
  return { environment: obj };
}
