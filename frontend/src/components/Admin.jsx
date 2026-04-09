import { useEffect, useState } from "react";

function Admin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Messages</h1>

      <div className="grid gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white/10 p-6 rounded-lg border border-white/20"
          >
            <h2 className="text-xl font-semibold">{msg.name}</h2>
            <p className="text-gray-300">{msg.email}</p>
            <p className="mt-2">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;