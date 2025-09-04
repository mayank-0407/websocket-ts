import express from "express";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
app.use(express.json());

const httpServer = app.listen(8000, () => {
  console.log("Server Started on port 8000");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (socket: any) => {
  socket.send("Hi You ate connected to Websocket Server");

  socket.on("error", console.error);

  socket.on("message", (data: any, isBinary: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
