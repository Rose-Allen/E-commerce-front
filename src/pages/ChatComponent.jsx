import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../styles/ChatComponent.css";
import { useAuth } from "../context/authContext";
let socket;

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [auth] = useAuth();
  //   useEffect(() => {
  //     socket = io("http://localhost:8080");
  //     socket.on("message", (data) => {
  //       setMessages([...messages, data]);
  //     });
  //     return () => {
  //       socket.off();
  //     };
  //   }, [messages]);

  useEffect(() => {
    // Delay for showing the chat
    const timer = setTimeout(() => {
      setShowChat(true);
      // Auto-send a message after chat appears
      setMessages([{ name: "System", message: "Чем я могу вам помочь?" }]);
    }, 10000);

    // Initialize socket connection
    socket = io("http://localhost:8080");
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      clearTimeout(timer); // Clear the timeout on unmount
      socket.off("message");
      socket.disconnect();
    };
  }, []);
  const sendMessage = () => {
    if (message) {
      // Include the user's name when emitting the message
      socket.emit("message", { name: auth?.user?.name, message });
      setMessage("");
    }
  };
  if (!showChat) {
    return null; // Don't render the chat until the timer expires
  }
  //   useEffect(() => {
  //     socket = io("http://localhost:8080"); // Adjust the URL to match your server
  //     socket.on("chat message", (msg) => {
  //       setMessages([...messages, msg]);
  //     });
  //     return () => {
  //       socket.off();
  //     };
  //   }, [messages]);

  //   const sendMessage = () => {
  //     if (message) {
  //       socket.emit("chat message", message);
  //       setMessage("");
  //     }
  //   };

  //   return (
  //     <div>
  //       <ul>
  //         {messages.map((msg, index) => (
  //           <li key={index}>{msg}</li>
  //         ))}
  //       </ul>
  //       <input
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //         onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
  //       />
  //       <button onClick={sendMessage}>Send</button>
  //     </div>
  //   );

  //   return (
  //     <div className="chat-container">
  //       <ul className="chat-messages">
  //         {messages.map((msg, index) => (
  //           <li key={index}>
  //             {auth?.user?.name && (
  //               <span className="user-name">{auth.user.name}: </span>
  //             )}
  //             {msg}
  //           </li>
  //         ))}
  //       </ul>
  //       <div className="chat-input-container">
  //         <input
  //           className="chat-input"
  //           value={message}
  //           onChange={(e) => setMessage(e.target.value)}
  //           onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
  //         />
  //         <button className="chat-send-btn" onClick={sendMessage}>
  //           Send
  //         </button>
  //       </div>
  //     </div>
  //   );
  return (
    <div className="chat-container">
      <ul className="chat-messages">
        {messages.map((data, index) => (
          <li key={index} className="chat-message">
            <span className="user-name">{data.name}: </span>
            {data.message}
          </li>
        ))}
      </ul>
      <div className="chat-input-container">
        <input
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
