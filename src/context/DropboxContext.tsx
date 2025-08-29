import { createContext, useContext, useEffect, useState } from "react";
import { DropboxContextType } from "../types";
import Cookies from "js-cookie";
const DropboxContext = createContext<DropboxContextType | null>(null);

export const DropboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessTokenDropbox, setAccessTokenDropbox] = useState(
    () => Cookies.get("accessTokenDropbox") || ""
  );
  const [folder, setFolder] = useState("");

  useEffect(() => {
    if (!accessTokenDropbox) return;
    Cookies.set("accessTokenDropbox", accessTokenDropbox, { expires: 0.2083 }); // expira en 5hs
  }, [accessTokenDropbox]);

  return (
    <DropboxContext.Provider
      value={{ accessTokenDropbox, setAccessTokenDropbox, folder, setFolder }}
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
