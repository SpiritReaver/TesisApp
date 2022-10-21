import React, { useState } from "react";

const Context = React.createContext({});

export function QueryContext({ children }) {
  const [q, setQ] = useState("");

  return <Context.Provider value={{ q, setQ }}>{children}</Context.Provider>;
}

export default Context;
