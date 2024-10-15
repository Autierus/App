import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const UserProvider = ({ children }) => {
  const [tema, setTema] = useState("");

  return (
    <MyContext.Provider
      value={{
        tema,
        setTema
      }}
    >
      {children}
    </MyContext.Provider>
  );
};