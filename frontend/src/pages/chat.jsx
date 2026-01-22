import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!message) return;
    const res = await API.post("/chat", { message });
    setChat([...chat, { user: message, ai: res.data.aiResponse }]);
    setMessage("");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>AI Chat</h2>
      <button onClick={logout}>Logout</button>

      <div>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p><b>AI:</b> {c.ai}</p>
          </div>
        ))}
      </div>

      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
