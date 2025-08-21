import { createContext, useContext, useState } from "react";
import { TeethIdsState } from "../types";
interface OdontogramContextType {
  dniOdontogram: string;
  setDniOdontogram: React.Dispatch<React.SetStateAction<string>>;
  originalData: TeethIdsState;
  setOriginalData: React.Dispatch<React.SetStateAction<TeethIdsState>>;
}

const OdontogramContext = createContext<OdontogramContextType | undefined>(
  undefined
);

export const OdontogramProvider = ({ children }) => {
  const [dniOdontogram, setDniOdontogram] = useState<string>("");
  const [originalData, setOriginalData] = useState<TeethIdsState>({});

  return (
    <OdontogramContext.Provider
      value={{
        dniOdontogram,
        setDniOdontogram,
        originalData,
        setOriginalData,
      }}
    >
      {children}
    </OdontogramContext.Provider>
  );
};

export const useOdontogramContext = () => {
  const context = useContext(OdontogramContext);
  if (!context) {
    throw new Error(
      "useOdontogramContext debe usarse dentro de un OdontogramProvider"
    );
  }
  return context;
};
