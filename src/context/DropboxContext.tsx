import { createContext, useContext, useEffect, useState } from "react";
import { DropboxContextType } from "../types";
import Cookies from "js-cookie";
const DropboxContext = createContext<DropboxContextType | null>(null);

export const DropboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState(
    () => Cookies.get("token") || ""
  );
  const [folder, setFolder] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    Cookies.set("token", accessToken, { expires: 0.0416 });
  }, [accessToken]);

  return (
    <DropboxContext.Provider
      value={{ accessToken, setAccessToken, folder, setFolder }}
    >
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
