import { wrapAsyncHandler } from "./async-wrapper";
import { auth } from "./auth";
// import { CORS_ORIGIN } from "./constants";

export default wrapAsyncHandler<unknown>(
  async event => {
    if (event.path === "/auth") {
      return await auth(event);
    }
    return {
      payload: { time: new Date().toString(), ...event },
    };
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
