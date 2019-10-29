import { RequestHandler } from "../handler";
import {
  RequestValidator,
  PathMatcher,
  Path,
  Connect,
  Delete,
  Get,
  Post,
  Head,
  Options,
  Patch,
  Put,
  Trace,
} from "./validators";

export interface Route {
  conditions: RequestValidator[] | RequestValidator;
  handler: RequestHandler;
}

/**
 * The Router handles determines which handler is matched given the
 * conditions present for each request.
 */
export class Router {
  private routes: Route[];
  constructor() {
    this.routes = [];
  }

  handle(conditions: Route["conditions"], handler: RequestHandler) {
    this.routes.push({
      conditions,
      handler,
    });
    return this;
  }

  connect(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Connect, Path(url)], handler);
  }

  delete(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Delete, Path(url)], handler);
  }

  get(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Get, Path(url)], handler);
  }

  head(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Head, Path(url)], handler);
  }

  options(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Options, Path(url)], handler);
  }

  patch(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Patch, Path(url)], handler);
  }

  post(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Post, Path(url)], handler);
  }

  put(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Put, Path(url)], handler);
  }

  trace(url: PathMatcher, handler: RequestHandler) {
    return this.handle([Trace, Path(url)], handler);
  }

  all(handler: RequestHandler) {
    return this.handle([], handler);
  }

  route(req: Request) {
    const route = this.resolve(req);

    if (route) {
      return route.handler(req);
    }

    return new Response("resource not found", {
      status: 404,
      statusText: "not found",
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  /**
   * resolve returns the matching route for a request that returns
   * true for all conditions (if any).
   */
  resolve(req: Request) {
    return this.routes.find(r => {
      if (!r.conditions || (Array.isArray(r) && !r.conditions.length)) {
        return true;
      }

      if (typeof r.conditions === "function") {
        return r.conditions(req);
      }

      return r.conditions.every(c => c(req));
    });
  }
}

export default Router;
