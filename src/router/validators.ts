/**
 * Helper functions that when passed a request will return a
 * boolean indicating if the request uses that HTTP method,
 * header, host or referrer.
 */
export type RequestValidator = (req: Request) => boolean;

export const Method: (method: string) => RequestValidator = method => req =>
  req.method.toLowerCase() === method.toLowerCase();
export const Connect = Method("connect");
export const Delete = Method("delete");
export const Get = Method("get");
export const Head = Method("head");
export const Options = Method("options");
export const Patch = Method("patch");
export const Post = Method("post");
export const Put = Method("put");
export const Trace = Method("trace");

export const Header: (
  header: string,
  val: string | null,
) => RequestValidator = (header, val) => req => req.headers.get(header) === val;
export const Host: (host: string) => RequestValidator = host =>
  Header("host", host.toLowerCase());
export const Referrer: (host: string) => RequestValidator = host =>
  Header("referrer", host.toLowerCase());

export type PathMatcher = string | Parameters<string["match"]>[0];

export const Path: (
  regExp: PathMatcher,
) => RequestValidator = regExp => req => {
  const url = new URL(req.url);
  const path = url.pathname;
  const match = path.match(regExp as string) || [];
  return match[0] === path;
};
