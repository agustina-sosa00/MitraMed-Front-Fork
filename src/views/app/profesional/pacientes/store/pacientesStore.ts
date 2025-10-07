import { create } from "zustand";
import { persist } from "zustand/middleware";

type Estado = "i" | "c" | "m";

export type ClientData = {
  [key: string]: any;
};

interface PacientesStore {
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

export const usePacientesStore = create<PacientesStore>()(
  persist(
    (set) => ({
      estado: "i",
      setEstado: (v) => set({ estado: v }),

      dniInput: "",
      setDniInput: (v) => set({ dniInput: v }),

      dataPaciente: null,
      setDataPaciente: (v) => set({ dataPaciente: v }),

      backupPaciente: null,

      startEdit: () =>
        set((s) => (s.dataPaciente ? { estado: "m", backupPaciente: { ...s.dataPaciente } } : s)),

      cancelEditToBackup: () =>
        set((s) =>
          s.backupPaciente
            ? { estado: "c", dataPaciente: s.backupPaciente, backupPaciente: null }
            : s,
        ),

      dataPacientesModal: null,
      setDataPacientesModal: (v) => set({ dataPacientesModal: v }),

      selectTable: false,
      setSelectTable: (v) => set({ selectTable: v }),

      reset: () =>
        set({
          estado: "i",
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
        backupPaciente: state.backupPaciente,
      }), //me guardo la info del usuario, el dni y el estado, para mantenerlo siempre a menos que lo resetee
    },
  ),
);
