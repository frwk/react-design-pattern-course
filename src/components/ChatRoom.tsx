import {User} from "../types/User.ts";
import {useEffect, useState} from "react";
import UserComponent from "./UserComponent.tsx";
import {Mediator} from "../types/Mediator.ts";

const mediator = new Mediator();
export default function ChatRoom() {

  const [rayhan] = useState(new User('rayhan'));
  const [wendy] = useState(new User('wendy'));
  const [florian] = useState(new User('florian'));
  const [kinan] = useState(new User('kinan'));
  const [messagesRayhab, setMessagesRayhab] = useState<string[]>([]);
  const [messagesWendy, setMessagesWendy] = useState<string[]>([]);
  const [messagesFlorian, setMessagesFlorian] = useState<string[]>([]);
  const [messagesKinan, setMessagesKinan] = useState<string[]>([]);

  useEffect(() => {
    mediator.users = [];
    mediator.registerUser(rayhan, (message) => setMessagesRayhab(prev => [...prev, message]));
    mediator.registerUser(wendy, (message) => setMessagesWendy(prev => [...prev, message]));
    mediator.registerUser(florian, (message) => setMessagesFlorian(prev => [...prev, message]));
    mediator.registerUser(kinan, (message) => setMessagesKinan(prev => [...prev, message]));
  }, [mediator, rayhan, wendy, florian, kinan]);

  const handleSendMessage = (user: User) => (message: string) => {
    mediator.sendMessage(user, message);
  };

  return (
    <div className="flex gap-44">
      <div className="flex-row">
        <UserComponent
          user={rayhan}
          messages={messagesRayhab}
          sendMessage={handleSendMessage(rayhan)}
        />
        <UserComponent
          user={wendy}
          messages={messagesWendy}
          sendMessage={handleSendMessage(wendy)}
        />
      </div>
      <div className="flex-row">
        <UserComponent
          user={florian}
          messages={messagesFlorian}
          sendMessage={handleSendMessage(florian)}
        />
        <UserComponent
          user={kinan}
          messages={messagesKinan}
          sendMessage={handleSendMessage(kinan)}
        />
      </div>
    </div>
  );
};
