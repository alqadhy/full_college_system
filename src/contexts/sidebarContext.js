import { createContext } from "react";

export let sidebarContext = createContext({
  isSidebarOpen: null,
  setIsSidebarOpen: null
});