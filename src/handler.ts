import { wrapAsyncHandler } from "./async-wrapper";
import { auth } from "./auth";

export default wrapAsyncHandler<unknown>(async event => {
  if (event.path === "/auth") {
    return await auth(event);
  }
  return {
    payload: { time: new Date().toString(), ...event },
  };
});
