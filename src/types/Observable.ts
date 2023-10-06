export interface Observer {
  (...args: any): void;
}

export interface Observable {
  notify: (args: unknown) => void;
  subscribe: (func: Observer) => void;
  unsubscribe: (func: Observer) => void;
}