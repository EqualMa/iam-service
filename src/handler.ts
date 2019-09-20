export type RequestHandlerResult = Parameters<FetchEvent["respondWith"]>[0];

export type RequestHandler = (request: Request) => RequestHandlerResult;
