import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/ChatInterface.css';
import ChatInterface from './components/ChatInterface';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am Hitesh Chaudhary. How can I help you today?' }
  ]);
  const [userQuery, setUserQuery] = useState('');

  const handleSend = async (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  return (
    <div className="center-container">
      <div className="app-heading">Persona Chat</div>
      <ChatInterface
        messages={messages}
        onSend={handleSend}
        userQuery={userQuery}
        setUserQuery={setUserQuery}
      />
    </div>
  );
}

export default App
