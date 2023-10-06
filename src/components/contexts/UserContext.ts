import { createContext } from "react";
import User from "../../types/User/User";

export const UserContext = createContext<User | null>(null);