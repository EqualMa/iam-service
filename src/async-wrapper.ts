import { FunctionEvent, FunctionHandler, FunctionContext } from "./types";

export class HandlerError<P> extends Error {
  public readonly result: AsyncHandlerResult<P>;

  constructor(result: AsyncHandlerResult<P>);
  constructor(message: string, result: AsyncHandlerResult<P>);
  constructor(
    message: string | AsyncHandlerResult<P>,
    result?: AsyncHandlerResult<P>,
  ) {
    if (typeof message === "string") {
      super(message);
      if (!result) {
        throw new Error("Argument result should be an object");
      }
      this.result = result;
    } else {
      super();
      this.result = message;
    }

    Reflect.setPrototypeOf(this, new.target.prototype);
  }
}

export interface AsyncHandlerResult<P> {
  status?: number;
  headers?: Record<string, string>;
  payload: P;
}

export type AsyncHandler<P> = (
  event: FunctionEvent,
  ctx: FunctionContext,
) => Promise<AsyncHandlerResult<P>>;

function processContext(
  ctx: FunctionContext,
  res: AsyncHandlerResult<unknown>,
) {
  const { status, headers } = res;
  if (status !== undefined) {
    ctx.status(status);
  }
  if (headers) {
    ctx.headers(headers);
  }
}

export function wrapAsyncHandler<P>(h: AsyncHandler<P>): FunctionHandler {
  return async (e, ctx) => {
    try {
      const res = await h(e, ctx);

      processContext(ctx, res);

      ctx.succeed(res.payload);
    } catch (err) {
      if (err instanceof HandlerError) {
        processContext(ctx, err.result);

        ctx.fail(err.result.payload);
      }
    }
  };
}
