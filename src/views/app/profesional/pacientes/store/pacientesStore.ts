import { create } from "zustand";
import { persist } from "zustand/middleware";

type Estado = "I" | "C" | "M";

export type ClientData = {
  [key: string]: any;
};

interface PacientesStoreProps {
  estado: Estado;
  setEstado: (v: Estado) => void;

  dniInput: string;
  setDniInput: (v: string) => void;

  dataPaciente: ClientData | null;
  setDataPaciente: (v: ClientData | null) => void;

  backupPaciente: ClientData | null;

  startEdit: () => void;
  cancelEditToBackup: () => void;

  dataPacientesModal: any;
  setDataPacientesModal: (v: any) => void;

  selectTable: boolean;
  setSelectTable: (v: boolean) => void;

  reset: () => void;
}

export const usePacientesStore = create<PacientesStoreProps>()(
  persist(
    (set) => ({
      estado: "I",
      setEstado: (v) => set({ estado: v }),

      dniInput: "",
      setDniInput: (v) => set({ dniInput: v }),

      dataPaciente: null,
      setDataPaciente: (v) => set({ dataPaciente: v }),

      backupPaciente: null,

      startEdit: () =>
        set((s) => (s.dataPaciente ? { estado: "M", backupPaciente: { ...s.dataPaciente } } : s)),

      cancelEditToBackup: () =>
        set((s) =>
          s.backupPaciente
            ? { estado: "C", dataPaciente: s.backupPaciente, backupPaciente: null }
            : s,
        ),

      dataPacientesModal: null,
      setDataPacientesModal: (v) => set({ dataPacientesModal: v }),

      selectTable: false,
      setSelectTable: (v) => set({ selectTable: v }),

      reset: () =>
        set({
          estado: "I",
          dniInput: "",
          dataPaciente: null,
          backupPaciente: null,
          dataPacientesModal: null,
        }),
    }),
    {
      name: "pacientes",

      partialize: (state) => ({
        dataPaciente: state.dataPaciente,
        dniInput: state.dniInput,
        estado: state.estado,
        // backupPaciente: state.backupPaciente,
      }), //me guardo la info del usuario, el dni y el estado, para mantenerlo siempre a menos que lo resetee
    },
  ),
);
