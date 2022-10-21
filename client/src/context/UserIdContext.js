import React, { useState } from "react";

const Context = React.createContext({});

export function UserIdContext({ children }) {
  const [UserId, setUserId] = useState(window.localStorage.getItem("UserId"));

  return (
    <Context.Provider value={{ UserId, setUserId }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
