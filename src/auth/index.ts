import { AsyncHandlerResult } from "../async-wrapper";
import { FunctionEvent } from "../types";
import { getGithubAccessToken } from "./access-token";

export async function auth(
  event: FunctionEvent,
): Promise<AsyncHandlerResult<object>> {
  const { code, state } = event.body;
  const res = await getGithubAccessToken({ code, state });
  return { payload: res };
  // throw new HandlerError({ payload: { code, state } });
}
