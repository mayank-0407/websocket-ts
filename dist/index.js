import http from "http";
import { WebSocket, WebSocketServer } from "ws";
const server = http.createServer((request, response) => {
    console.log("Server Created!!");
    response.end("Hi from server");
});
const wss = new WebSocketServer({ server });
wss.on("connection", (socket) => {
    socket.on("error", console.error);
    socket.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    socket.send("Hi this is message for Websocket Server");
});
server.listen(8000, () => {
    console.log("Server Started at port 8080");
});
//# sourceMappingURL=index.js.map