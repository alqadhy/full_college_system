import { createContext } from "react";

export let userDataContext = createContext({
  userData: null,
  setUserData: null
});