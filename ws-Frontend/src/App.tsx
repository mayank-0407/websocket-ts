import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputBox, setinputBox] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("Connect With backend socket");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("Message Recieved : ", message);
      setMessages((m) => [...m, message.data]);
    };
  }, []);

  if (!socket) return <div>Connecting the Socket...</div>;
  return (
    <>
      <input
        onChange={(e) => {
          setinputBox(e.target.value);
        }}
      />
      <button
        onClick={() => {
          socket.send(inputBox);
        }}
      >
        Send
      </button>
      <div>
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
    </>
  );
}

export default App;
