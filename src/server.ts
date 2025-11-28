import http, { IncomingMessage, Server, ServerResponse } from "http"

const server: Server = http.createServer((req: IncomingMessage,res: ServerResponse) => {
    if(req.url === "/" && req.method === "GET") {
        
    }
})