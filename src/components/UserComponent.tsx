import {User} from "../types/User.ts";
import {useState} from "react";

interface UserComponentProps {
  user: User;
  messages: string[];
  onSendMessage: (message: string) => void;
}

export default function UserComponent({ user, messages, onSendMessage }: UserComponentProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <h3>{user.name}'s Chat</h3>
      <textarea value={messages.join('\n')} readOnly />
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

