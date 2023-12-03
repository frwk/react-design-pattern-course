
import {User} from "../types/User.ts";
import {useState} from "react";
import UserComponent from "./UserComponent.tsx";

export default function ChatRoom() {
  const [rayhan] = useState(new User('rayhan'));
  const [wendy] = useState(new User('wendy'));
  const [florian] = useState(new User('florian'));
  const [kinan] = useState(new User('kinan'));
  const [messagesRayhab, setMessagesRayhab] = useState<string[]>([]);
  const [messagesWendy, setMessagesWendy] = useState<string[]>([]);
  const [messagesFlorian, setMessagesFlorian] = useState<string[]>([]);
  const [messagesKinan, setMessagesKinan] = useState<string[]>([]);

  const rayhanSendMessage = (message: string) => {
    setMessagesWendy(prev => [...prev, `rayhan: ${message}`]);
    setMessagesFlorian(prev => [...prev, `rayhan: ${message}`]);
    setMessagesKinan(prev => [...prev, `rayhan: ${message}`]);
  };

  const wendySendMessage = (message: string) => {
    setMessagesRayhab(prev => [...prev, `wendy: ${message}`]);
    setMessagesFlorian(prev => [...prev, `wendy: ${message}`]);
    setMessagesKinan(prev => [...prev, `wendy: ${message}`]);
  };

  const florianSendMessage = (message: string) => {
    setMessagesRayhab(prev => [...prev, `florian: ${message}`]);
    setMessagesWendy(prev => [...prev, `florian: ${message}`]);
    setMessagesKinan(prev => [...prev, `florian: ${message}`]);
  };
  const kinanSendMessage = (message: string) => {
    setMessagesRayhab(prev => [...prev, `kinan: ${message}`]);
    setMessagesWendy(prev => [...prev, `kinan: ${message}`]);
    setMessagesFlorian(prev => [...prev, `kinan: ${message}`]);
  };

  return (
    <div className="flex gap-44">
      <div className="flex-row">
        <UserComponent
          key={rayhan.name}
          user={rayhan}
          messages={messagesRayhab}
          onSendMessage={rayhanSendMessage}
        />
        <UserComponent
          key={wendy.name}
          user={wendy}
          messages={messagesWendy}
          onSendMessage={wendySendMessage}
        />
      </div>
      <div className="flex-row">
        <UserComponent
          key={florian.name}
          user={florian}
          messages={messagesFlorian}
          onSendMessage={florianSendMessage}
        />
        <UserComponent
          key={kinan.name}
          user={kinan}
          messages={messagesKinan}
          onSendMessage={kinanSendMessage}
        />
      </div>
    </div>
  );
}
