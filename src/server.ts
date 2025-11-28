import http, { IncomingMessage, Server, ServerResponse } from "http";
import ENV from "./config";
import { RouteHandler, routes } from "./helpers/RouteHandler";
import sendJson from "./helpers/sendJson";
import "./routes";
import findDynamicRoute from "./helpers/dynamicRouteHandler";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running...");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else if (findDynamicRoute(method, path)) {
      const match = findDynamicRoute(method, path);
      (req as any).params = match?.params;
      match?.handler(req, res);
    } else {
      sendJson(res, 404, {
        success: false,
        message: "Route not found!",
        path,
      });
    }
  }
);

const PORT = ENV.PORT ?? 8080;

server.listen(PORT, () => {
  console.log(`Server is running port: ${PORT}`);
});
