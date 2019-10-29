import Router from "../router";
import authHandler from "./auth";
import corsHandler from "./cors";

export const router = new Router();

router.post("/auth", authHandler);

// router.get("/bar", () => new Response("responding for /bar"));
// router.get(".*/foo", req => new Response("get /foo from " + req.url));
// router.post(".*/foo", req => new Response("post /foo from " + req.url));
// router.get("/demos/router/foo", req => fetch(req)); // return the response from the origin

router.options(/.*/, corsHandler);
