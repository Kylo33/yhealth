import { createContext } from "react";

export type User = {
  name: string;
  score: number;
}

type IUserContext = {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const UserContext = createContext<IUserContext>({users: [], setUsers: () => []});
