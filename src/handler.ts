import { wrapAsyncHandler, HandlerError } from "./async-wrapper";
import { auth } from "./auth";
// import { CORS_ORIGIN } from "./constants";

export default wrapAsyncHandler<unknown>(
  async event => {
    try {
      if (event.path === "/auth") {
        return await auth(event);
      }
      return {
        payload: { time: new Date().toString() },
      };
    } catch (err) {
      throw new HandlerError(err.message, {
        payload: { message: err.message },
      });
    }
  },
  ({ res }) => ({
    ...res,
    payload: JSON.stringify(res.payload),
    headers: {
      "Content-Type": "application/json",
      ...res.headers,
    },
  }),
  // ({ res }) => ({
  //   ...res,
  //   headers: {
  //     "Access-Control-Allow-Origin": CORS_ORIGIN,
  //     "Access-Control-Allow-Headers":
  //       "Origin, X-Requested-With, Content-Type, Accept",
  //     ...res.headers,
  //   },
  // }),
);
