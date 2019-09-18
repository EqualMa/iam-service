// https://github.com/openfaas-incubator/node10-express-template/tree/master/template/node10-express
import * as express from "express";
import handler from "../src/handler";
import {
  FunctionEvent as FunctionEventInterface,
  FunctionContext as FunctionContextInterface,
  FunctionCallback,
} from "../src/types";
import * as bodyParser from "body-parser";
import * as cors from "cors";

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text({ type: "text/*" }));
app.disable("x-powered-by");

app.use(cors());

class FunctionEvent implements FunctionEventInterface {
  public readonly body: express.Request["body"];
  public readonly headers: express.Request["headers"];
  public readonly method: express.Request["method"];
  public readonly query: express.Request["query"];
  public readonly path: express.Request["path"];

  constructor(req: express.Request) {
    this.body = req.body;
    this.headers = req.headers;
    this.method = req.method;
    this.query = req.query;
    this.path = req.path;
  }
}

class FunctionContext implements FunctionContextInterface {
  constructor(public readonly cb: FunctionCallback) {}
  protected value = 200;
  protected headerValues: Record<string, string> = {};

  public status(): number;
  public status(value: number): this;
  public status(value?: number) {
    if (!value) {
      return this.value;
    }

    this.value = value;
    return this;
  }

  public headers(): Record<string, string>;
  public headers(headers: Record<string, string>): this;
  public headers(value?: Record<string, string>) {
    if (!value) {
      return this.headerValues;
    }

    this.headerValues = value;
    return this;
  }

  public succeed<V>(value: V): void {
    this.cb(undefined, value);
  }

  public fail<E>(err: E): void {
    this.cb(err, undefined);
  }
}

const middleware: express.RequestHandler = (req, res) => {
  const fnContext = new FunctionContext((err, functionResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    if (typeof functionResult === "object") {
      res
        .set(fnContext.headers())
        .status(fnContext.status())
        .send(JSON.stringify(functionResult));
    } else {
      res
        .set(fnContext.headers())
        .status(fnContext.status())
        .send(functionResult);
    }
  });

  const fnEvent = new FunctionEvent(req);

  handler(fnEvent, fnContext, fnContext.cb);
};

app.post("/*", middleware);
app.get("/*", middleware);
app.patch("/*", middleware);
app.put("/*", middleware);
app.delete("/*", middleware);

const port = process.env.http_port || 3000;

app.listen(port, () => {
  console.log(`OpenFaaS Node.js listening on port: ${port}`);
});
