import { createContext, useContext, useState } from "react";
import { IArrayTableHistorial } from "../types";
interface MedicalHistoryContextType {
  historyContext: IArrayTableHistorial[];
  setHistoryContext: React.Dispatch<
    React.SetStateAction<IArrayTableHistorial[]>
  >;
  hc: boolean;
  setHc: React.Dispatch<React.SetStateAction<boolean>>;
  numHistory: string;
  setNumHistory: React.Dispatch<React.SetStateAction<string>>;
}
const MedicalHistoryContext = createContext<
  MedicalHistoryContextType | undefined
>(undefined);

export const MedicalHistoryProvider = ({ children }) => {
  const [historyContext, setHistoryContext] = useState<IArrayTableHistorial[]>(
    []
  );
  const [hc, setHc] = useState<boolean>(false);
  const [numHistory, setNumHistory] = useState<string>("");

  return (
    <MedicalHistoryContext.Provider
      value={{
        historyContext,
        setHistoryContext,
        hc,
        setHc,
        numHistory,
        setNumHistory,
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
