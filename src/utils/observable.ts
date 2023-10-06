import { Observer } from '../types/Observable';

const observers: Observer[] = [];

const observable = Object.freeze({
  notify: (...args: unknown[]) => observers.forEach((observer) => observer(...args)),
  subscribe: (func: Observer) => observers.push(func),
  unsubscribe: (func: Observer) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});

export default observable;
