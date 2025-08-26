import { createContext, useContext, useState } from "react";
import { IArrayTableHistorial } from "../types";
interface MedicalHistoryContextType {
  historyContext: IArrayTableHistorial[];
  setHistoryContext: React.Dispatch<
    React.SetStateAction<IArrayTableHistorial[]>
  >;
  hc: boolean;
  setHc: React.Dispatch<React.SetStateAction<boolean>>;
  dniHistory: string;
  setDniHistory: React.Dispatch<React.SetStateAction<string>>;
  hasConfirmed: boolean;
  setHasConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  uiLoading: boolean;
  setUiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dniInput: string;
  setDniInput: React.Dispatch<React.SetStateAction<string>>;
}
const MedicalHistoryContext = createContext<
  MedicalHistoryContextType | undefined
>(undefined);

export const MedicalHistoryProvider = ({ children }) => {
  const [historyContext, setHistoryContext] = useState<IArrayTableHistorial[]>(
    []
  );
  const [hc, setHc] = useState<boolean>(false);
  const [dniHistory, setDniHistory] = useState<string>("");
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [uiLoading, setUiLoading] = useState<boolean>(false);
  const [dniInput, setDniInput] = useState<string>("");
  return (
    <MedicalHistoryContext.Provider
      value={{
        historyContext,
        setHistoryContext,
        hc,
        setHc,
        dniHistory,
        setDniHistory,
        hasConfirmed,
        setHasConfirmed,
        uiLoading,
        setUiLoading,
        dniInput,
        setDniInput,
      }}
    >
      {children}
    </MedicalHistoryContext.Provider>
  );
};

export const useMedicalHistoryContext = () => {
  const context = useContext(MedicalHistoryContext);
  if (!context) {
    throw new Error(
      "useMedicalHistoryContext debe usarse dentro de un MedicalHistoryProvider"
    );
  }
  return context;
};
