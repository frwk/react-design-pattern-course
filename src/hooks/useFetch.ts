import FetchProps from "../types/FetchProps";
import { useEffect, useState } from "react";

export const useFetch = ({ endpoint, options = {} }: FetchProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const url = `https://jsonplaceholder.typicode.com/${endpoint}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          ...options,
          signal: abortController.signal,
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const responseData = await res.json();

        setData(responseData);
      } catch (e: any) {
        if (!abortController.signal.aborted) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [endpoint, JSON.stringify(options)]);

  return { isLoading, data, error };
};