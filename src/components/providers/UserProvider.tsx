import { useEffect, useState } from "react";
import User from "../../types/User/User";
import { UserContext } from "../contexts/UserContext";
import { useFetch } from "../../hooks/useFetch";

export default function UserProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const { data, error }: {data: User, error: any} = useFetch({ endpoint: 'users/1' });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      console.error(error);
    }
    return () => {
      setUser(null);
    };
  }, [data, error, user]);
   
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}
