import { router } from "./routes";
import { HandlerError } from "./handler-error";

const jsonHeaders = { "content-type": "application/json" };

async function handleRequest(request: Request): Promise<Response> {
  try {
    const resp = await router.route(request);
    return resp;
  } catch (e) {
    if (e instanceof HandlerError) {
      const { headers, payload, status = 500 } = e.result;
      return new Response(
        JSON.stringify({
          message: e.message,
          data: payload,
        }),
        { headers: { ...jsonHeaders, ...headers }, status },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: e.message,
        }),
        { status: 500 },
      );
    }
  }
}

/**
 * Example of how router can be used in an application
 *  */
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
