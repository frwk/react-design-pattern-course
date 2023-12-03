import {User} from "./User.ts";

export class Mediator {
  users: User[];
  messageHandlers: Map<User, (message: string) => void>;

  constructor() {
    this.users = [];
    this.messageHandlers = new Map();
  }

  registerUser(user: User, messageHandler: (message: string) => void) {
    this.users.push(user);
    this.messageHandlers.set(user, messageHandler);
  }

  sendMessage(sender: User, message: string) {
    this.users.forEach(user => {
      if (user !== sender) {
        const handler = this.messageHandlers.get(user);
        if (handler) {
          handler(`${sender.name}: ${message}`);
        }
      }
    });
  }
}
