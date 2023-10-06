import { useContext } from "react";
import { UserContext } from "../App";

export default function useUserContext() {

    return useContext(UserContext);
}