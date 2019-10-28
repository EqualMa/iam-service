import { HandlerError } from "../handler-error";
import { getGithubAccessToken } from "../auth/access-token";
import { getCorsResponseHeader } from "./cors";
export default async function authHandler(request: Request): Promise<Response> {
  // console.log(request.json())

  const { code, state } = (await request.json()) as {
    code?: string;
    state?: string;
  };
  if (!code || !state) {
    throw new HandlerError({ payload: {} });
  }
  const res = await getGithubAccessToken({ code, state });
  return new Response(JSON.stringify(res), {
    headers: {
      "content-type": "application/json",
      ...getCorsResponseHeader(),
    },
  });
  // throw new HandlerError({ payload: { code, state } });
}
