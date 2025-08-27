import { createContext, useContext, useEffect, useState } from "react";
import { DropboxContextType } from "../types";
import Cookies from "js-cookie";
const DropboxContext = createContext<DropboxContextType | null>(null);

export const DropboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(() => Cookies.get("token") || "");
  const [folder, setFolder] = useState("");

  useEffect(() => {
    if (!token) return;
    Cookies.set("token", token, { expires: 0.0416 });
  }, [token]);

  return (
    <DropboxContext.Provider value={{ token, setToken, folder, setFolder }}>
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
