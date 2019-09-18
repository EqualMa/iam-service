import fly, { FlyError } from "flyio";
export { fly };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFlyError(err: any): err is FlyError {
  return !!(err.status !== undefined && err.engine && err.response);
}
