import { createContext } from "react";

type ICurrentUserContext = {
  currentUser: string | undefined;
  setCurrentUser: (value: string | undefined) => void;
}

export const CurrentUserContext = createContext<ICurrentUserContext>({currentUser: undefined, setCurrentUser: () => {}});
