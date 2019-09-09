import { Application } from "express";
import { Routing } from "./routing";

export interface AppConfig {
  app: Application;
}

export default async (config: AppConfig) => {
  const routing = new Routing(config.app);
  routing.configure();
  routing.bind(routing.handle);
};
