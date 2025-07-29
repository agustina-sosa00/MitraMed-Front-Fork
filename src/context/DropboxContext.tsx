import { createContext, useState } from "react";

const DropboxContext = createContext({});

export const DropboxProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <DropboxContext.Provider value={{ token, setToken }}>
      {children}
    </DropboxContext.Provider>
  );
};
