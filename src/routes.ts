import Router from "./router";

export const router = new Router();

router.get("/bar", () => new Response("responding for /bar"));
router.get(".*/foo", req => new Response("get /foo from " + req.url));
router.post(".*/foo", req => new Response("post /foo from " + req.url));
router.get("/demos/router/foo", req => fetch(req)); // return the response from the origin

router.get("/", () => new Response("Hello worker!")); // return a default message for the root route
