import { IncomingMessage } from "http";

async function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, rejects) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error: any) {
        rejects(error);
      }
    });
    req.on("error", rejects);
  });
}

export default parseBody;
