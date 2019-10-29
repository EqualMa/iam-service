import { CORS_ORIGIN } from "../constants";
import { HandlerError } from "../handler-error";

const enableCors = !!CORS_ORIGIN;

export const getCorsResponseHeader: () => Record<string, string> = () =>
  enableCors
    ? {
        "Access-Control-Allow-Origin": CORS_ORIGIN,
      }
    : ({} as Record<string, string>);

const corsHeaders: Record<string, string> = enableCors
  ? {
      ...getCorsResponseHeader(),
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  : {};

export default async function corsHandler(request: Request): Promise<Response> {
  if (request.method.toLowerCase() === "options") {
    // https://developers.cloudflare.com/workers/archive/recipes/cors-preflight-requests/
    if (
      request.headers.get("Origin") !== null &&
      request.headers.get("Access-Control-Request-Method") !== null &&
      request.headers.get("Access-Control-Request-Headers") !== null
    ) {
      // Handle CORS pre-flight request.
      return new Response(null, {
        headers: corsHeaders,
      });
    } else {
      // Handle standard OPTIONS request.
      return new Response(null, {
        headers: {
          Allow: "GET, HEAD, POST, OPTIONS",
        },
      });
    }
  }
  throw new HandlerError("Unexpected access", { payload: {} });
}
