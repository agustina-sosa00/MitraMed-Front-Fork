import { createContext, useContext, useState } from "react";
interface MedicalHistoryContextType {
  hc: boolean;
  setHc: React.Dispatch<React.SetStateAction<boolean>>;
  idpaciente: number | null;
  setIdpaciente: React.Dispatch<React.SetStateAction<number | null>>;
  dniHistory: string;
  setDniHistory: React.Dispatch<React.SetStateAction<string>>;
  hasConfirmed: boolean;
  setHasConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  uiLoading: boolean;
  setUiLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dniInput: string;
  setDniInput: React.Dispatch<React.SetStateAction<string>>;
}
const MedicalHistoryContext = createContext<MedicalHistoryContextType | undefined>(undefined);

export const MedicalHistoryProvider = ({ children }) => {
  const [hc, setHc] = useState<boolean>(false);
  const [idpaciente, setIdpaciente] = useState<number | null>(null);
  const [dniHistory, setDniHistory] = useState<string>("");
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [uiLoading, setUiLoading] = useState<boolean>(false);
  const [dniInput, setDniInput] = useState<string>("");
  return (
    <MedicalHistoryContext.Provider
      value={{
        hc,
        setHc,
        idpaciente,
        setIdpaciente,
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
    throw new Error("useMedicalHistoryContext debe usarse dentro de un MedicalHistoryProvider");
  }
  return context;
};
