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
      <textarea className="w-full h-32" value={messages.join('\n')} readOnly />
      <div>
        <input
          className={"w-70"}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="w-30" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

