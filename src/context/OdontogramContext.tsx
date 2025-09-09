import { createContext, useContext, useState } from "react";
import { TeethIdsState } from "../types";
interface OdontogramContextType {
  dniOdontogram: string;
  setDniOdontogram: React.Dispatch<React.SetStateAction<string>>;
  originalData: TeethIdsState;
  setOriginalData: React.Dispatch<React.SetStateAction<TeethIdsState>>;
  teethIdsState: TeethIdsState;
  setTeethIdsState: React.Dispatch<React.SetStateAction<TeethIdsState>>;
  hasConfirmed: boolean;
  setHasConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  uiLoading: boolean;
  setUiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dniInput: string;
  setDniInput: React.Dispatch<React.SetStateAction<string>>;
}

const OdontogramContext = createContext<OdontogramContextType | undefined>(
  undefined
);

export const OdontogramProvider = ({ children }) => {
  const [dniOdontogram, setDniOdontogram] = useState<string>("");
  const [originalData, setOriginalData] = useState<TeethIdsState>({});
  const [teethIdsState, setTeethIdsState] = useState<TeethIdsState>({});
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [uiLoading, setUiLoading] = useState<boolean>(false);
  const [dniInput, setDniInput] = useState<string>("");

  return (
    <OdontogramContext.Provider
      value={{
        dniOdontogram,
        setDniOdontogram,
        originalData,
        setOriginalData,
        teethIdsState,
        setTeethIdsState,
        hasConfirmed,
        setHasConfirmed,
        uiLoading,
        setUiLoading,
        dniInput,
        setDniInput,
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
