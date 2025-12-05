import { createContext } from "react";

export let userTasksContext = createContext({
  userTasks: null,
  setUserTasks: null
});