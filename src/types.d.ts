import { Request } from "express";

declare type FunctionHandler = (
  event: FunctionEvent,
  context: FunctionContext,
) => void;

declare class FunctionEvent {
  public constructor(req: Request);
  public readonly body: Request["body"];
  public readonly headers: Request["headers"];
  public readonly method: Request["method"];
  public readonly query: Request["query"];
  public readonly path: Request["path"];
}

declare class FunctionContext {
  public status(): number;
  public status(value: number): this;

  public headers(): Record<string, string>;
  public headers(headers: Record<string, string>): this;

  public succeed<V>(value: V): void;

  public fail<E>(err: E): void;
}
