import { wrapAsyncHandler } from "./async-wrapper";

export default wrapAsyncHandler(async event => {
  return {
    payload: { time: new Date().toString(), ...event },
  };
});
