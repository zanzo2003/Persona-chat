


// import React, { useRef, useEffect } from "react";
// import "../styles/ChatInterface.css";
// import generateAiPersonaResponse from "../services/aiService";

// export default function ChatInterface({ messages, onSend, userQuery, setUserQuery }) {
//   const chatAreaRef = useRef(null);

//   useEffect(() => {
//     if (chatAreaRef.current) {
//       chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleInputChange = (e) => setUserQuery(e.target.value);
//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!userQuery.trim()) return;

//     const userMessage = {
//       role: 'user',
//       content: userQuery
//     };
//     onSend(userMessage);

//     try {
//       const aiResponse = await generateAiPersonaResponse(userQuery);
//       const aiMessage = {
//         role: 'assistant',
//         content: aiResponse
//       };
//       onSend(aiMessage);
//     } catch (error) {
//       console.error('Error getting AI response:', error);
//       const errorMessage = {
//         role: 'assistant',
//         content: 'Sorry, I encountered an error while processing your request.'
//       };
//       onSend(errorMessage);
//     }
    
//     setUserQuery('');
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h2>AI Assistant</h2>
//       </div>
//       <div className="chat-area" ref={chatAreaRef}>
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`message ${msg.role}`}>
//             <div className="avatar">
//               <img 
//                 src={msg.role === "user" ? "../../assets/user_icon.png" : "../../assets/hites.jpg"} 
//                 alt={`${msg.role} avatar`} 
//               />
//             </div>
//             <div className="bubble">{msg.content}</div>
//           </div>
//         ))}
//       </div>
//       <div className="chat-input-container">
//         <input
//           className="chat-input"
//           type="text"
//           placeholder="Type your message..."
//           value={userQuery}
//           onChange={handleInputChange}
//         />
//         <button type="button" className="chat-submit-button" onClick={handleSend}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useEffect, useState } from "react";
import "../styles/ChatInterface.css";
import generateAiPersonaResponse from "../services/aiService";

export default function ChatInterface({ messages, onSend, userQuery, setUserQuery }) {
  const chatAreaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleInputChange = (e) => setUserQuery(e.target.value);
  
  const handleSend = async (e) => {
    e.preventDefault();
    if (!userQuery.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: userQuery
    };
    onSend(userMessage);
    setUserQuery('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAiPersonaResponse(userQuery);
      const aiMessage = {
        role: 'assistant',
        content: aiResponse
      };
      onSend(aiMessage);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.'
      };
      onSend(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with Hitesh</h2>
      </div>
      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="avatar">
              <img
                src={msg.role === "user" ? "../../assets/user_icon.png" : "../../assets/hites.jpg"}
                alt={`${msg.role} avatar`}
              />
            </div>
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="avatar">
              <img
                src="../../assets/hites.jpg"
                alt="assistant avatar"
              />
            </div>
            <div className="bubble loading-bubble">
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <input
          className="chat-input"
          type="text"
          placeholder="Type your message..."
          value={userQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          type="button" 
          className={`chat-submit-button ${isLoading ? 'disabled' : ''}`}
          onClick={handleSend}
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 2L11 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
