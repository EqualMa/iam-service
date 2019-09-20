import { router } from "./routes";

async function handleRequest(request: Request): Promise<Response> {
  const resp = await router.route(request);
  return resp;
}

/**
 * Example of how router can be used in an application
 *  */
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
