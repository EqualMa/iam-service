import { Application, Request, Response, RequestHandler } from "express";
import * as bodyParser from "body-parser";

export class Routing {
  constructor(protected app: Application) {}

  configure() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.raw());
    this.app.use(bodyParser.text({ type: "text/*" }));
    this.app.disable("x-powered-by");
  }

  bind(route: RequestHandler) {
    this.app.post("/*", route);
    this.app.get("/*", route);
    this.app.patch("/*", route);
    this.app.put("/*", route);
    this.app.delete("/*", route);
  }

  handle(req: Request, res: Response) {
    res.send(JSON.stringify(req.body));
  }
}
