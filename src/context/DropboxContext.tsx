import { createContext, useContext, useState } from "react";
import { DropboxContextType } from "../types";

const DropboxContext = createContext<DropboxContextType | null>(null);

export const DropboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState("");

  return (
    <DropboxContext.Provider value={{ token, setToken }}>
      {children}
    </DropboxContext.Provider>
  );
};

export const useContextDropbox = () => {
  const context = useContext(DropboxContext);
  if (!context) {
    throw new Error("useContextDropbox debe usarse dentro de DropboxProvider");
  }
  return context;
};
