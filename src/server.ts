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

    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health status ok!",
          path: req.url,
        })
      );
    }

    if(req.url === "/api/users" && req.method === "POST") {
        let body = "";

        req.on("data",(chunk) => {
            body += chunk.toString();
        })

        req.on("end",() => {
            try {
                const parseBody = JSON.parse(body);
                res.end(JSON.stringify(parseBody))
            } catch (error: any) {
                console.log(error?.message)
            }
        })
    }


  }
);

server.listen(ENV.PORT, () => {
  console.log(`Server is rinngin port ${ENV.PORT}`);
});
