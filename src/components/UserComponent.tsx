import { useState } from 'react';
import {User} from "../types/User.ts";

interface UserComponentProps {
  user: User;
  messages: string[];
  sendMessage: (message: string) => void;
}

export default function UserComponent({ user, messages, sendMessage }: UserComponentProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <h3>{user.name}'s Chat</h3>
      <textarea value={messages.join('\n')} readOnly style={{ width: '100%', height: '150px' }} />
      <div>
        <input
          className={"w-70"}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ width: '70%' }}
        />
        <button onClick={handleSendMessage} style={{ width: '30%' }}>
          Send
        </button>
      </div>
    </div>
  );
};
