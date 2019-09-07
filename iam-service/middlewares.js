exports.default = [
  async ctx => {
    ctx.body = "Hello World from iam service at " + new Date().toString();
  }
];
