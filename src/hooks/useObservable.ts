import { useEffect } from 'react';
import { Observable, Observer } from '../types/Observable';

const useObservable = (observable: Observable, fn: Observer) => {
  useEffect(() => {
    observable.subscribe(fn);

    return () => {
      observable.unsubscribe(fn);
    };
  }, [observable, fn]);
};

export default useObservable;
