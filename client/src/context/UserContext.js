import React, { useState } from "react";
import Cookies from "universal-cookie";

const Context = React.createContext({});
const cookies = new Cookies();

export function UserContext({ children }) {
  const [token, setToken] = useState(cookies.get("ID", { path: "/" }));

  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
}

export default Context;
