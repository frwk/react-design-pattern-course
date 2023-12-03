
import {User} from "../types/User.ts";
import {useState} from "react";
import UserComponent from "./UserComponent.tsx"; // Assuming UserComponent is imported from your components

export default function ChatRoom() {
  const [user1] = useState(new User('user1'));
  const [user2] = useState(new User('user2'));
  const [user3] = useState(new User('user3'));
  const [messagesUser1, setMessagesUser1] = useState<string[]>([]);
  const [messagesUser2, setMessagesUser2] = useState<string[]>([]);
  const [messagesUser3, setMessagesUser3] = useState<string[]>([]);

  const sendMessage1 = (message: string) => {
    setMessagesUser2(prev => [...prev, `user1: ${message}`]);
    setMessagesUser3(prev => [...prev, `user1: ${message}`]);
  };

  const sendMessage2 = (message: string) => {
    setMessagesUser1(prev => [...prev, `user2: ${message}`]);
    setMessagesUser3(prev => [...prev, `user2: ${message}`]);
  };

  const sendMessage3 = (message: string) => {
    setMessagesUser1(prev => [...prev, `user3: ${message}`]);
    setMessagesUser2(prev => [...prev, `user3: ${message}`]);
  };

  return (
    <div>
      <UserComponent
        key={user1.name}
        user={user1}
        messages={messagesUser1}
        onSendMessage={sendMessage1}
      />
      <UserComponent
        key={user2.name}
        user={user2}
        messages={messagesUser2}
        onSendMessage={sendMessage2}
      />
      <UserComponent
        key={user3.name}
        user={user3}
        messages={messagesUser3}
        onSendMessage={sendMessage3}
      />
    </div>
  );
}
