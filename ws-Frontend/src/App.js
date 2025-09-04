import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000");
        socket.onopen = () => {
            console.log("Connect With backend socket");
            setWebsocket(socket);
        };
        socket.onmessage = (message) => {
            console.log("Message Recieved : ", message);
            setMessages((m) => [...m, message.data]);
        };
    }, []);
    if (!websocket)
        return _jsx("div", { children: "Connecting the Socket..." });
    return (_jsxs(_Fragment, { children: [_jsx("input", { onChange: (e) => {
                    setInputMessage(e.target.value);
                } }), _jsxs("button", { type: "submit", onSubmit: () => {
                    websocket.send(inputMessage);
                }, children: ["Send", " "] }), _jsx("p", { children: messages })] }));
}
export default App;
//# sourceMappingURL=App.js.map