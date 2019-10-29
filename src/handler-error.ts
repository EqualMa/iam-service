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
