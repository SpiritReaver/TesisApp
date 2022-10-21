import React, { useState } from "react";

const Context = React.createContext({});

export function ParamContext({ children }) {
  const [filterParam, setFilterParam] = useState(["All"]);

  return (
    <Context.Provider value={{ filterParam, setFilterParam }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
