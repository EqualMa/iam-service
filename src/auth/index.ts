import { AsyncHandlerResult } from "../async-wrapper";
import { FunctionEvent } from "../types";

export async function auth(
  event: FunctionEvent,
): Promise<AsyncHandlerResult<{ a: string; path: string }>> {
  return { payload: { a: "b", path: event.path } };
}
