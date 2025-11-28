import http, { IncomingMessage, Server, ServerResponse } from "http";
import ENV from "./config/env";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from node js with typescript",
          path: req.url,
        })
      );
    }
  }
);

server.listen(ENV.PORT, () => {
  console.log(`Server is rinngin port ${ENV.PORT}`);
});
