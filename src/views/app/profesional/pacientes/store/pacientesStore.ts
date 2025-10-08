import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Estado = "I" | "C" | "M";

export type ClientData = {
  [key: string]: any;
};

export type ErrorPlace = "header" | "modal";
export type UiError = { place: ErrorPlace; message: string } | null;

interface PacientesStoreProps {
  estado: Estado;
  setEstado: (v: Estado) => void;

  dniInput: string;
  setDniInput: (v: string) => void;

  dataPaciente: ClientData | null;
  setDataPaciente: (v: ClientData | null) => void;

  dataPacientesModi: ClientData | null;

  startEdit: () => void;
  cancelEditToBackup: () => void;

  dataPacientesModal: any;
  setDataPacientesModal: (v: any) => void;

  selectTable: boolean;
  setSelectTable: (v: boolean) => void;

  errorMessage: UiError;
  setErrorMessage: (place: ErrorPlace, message: string) => void;
  clearErrorMessage: (place?: ErrorPlace) => void;

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

      dataPacientesModi: null,
      startEdit: () =>
        set((s) => {
          if (!s.dataPaciente) return {};
          if (s.estado === "M" && s.dataPacientesModi) return {};
          return {
            estado: "M",

            dataPacientesModi: JSON.parse(JSON.stringify(s.dataPaciente)),
          };
        }),

      cancelEditToBackup: () =>
        set((s) => {
          if (!s.dataPacientesModi) return {};
          return {
            estado: "C",
            dataPaciente: s.dataPacientesModi,
            dataPacientesModi: null,
          };
        }),

      dataPacientesModal: null,
      setDataPacientesModal: (v) => set({ dataPacientesModal: v }),

      selectTable: false,
      setSelectTable: (v) => set({ selectTable: v }),

      errorMessage: null,
      setErrorMessage: (place, message) => set({ errorMessage: { place, message } }),
      clearErrorMessage: (place) =>
        set((s) => {
          if (!s.errorMessage) return s;
          return !place || s.errorMessage.place === place ? { errorMessage: null } : s;
        }),

      reset: () =>
        set({
          estado: "I",
          dniInput: "",
          dataPaciente: null,
          dataPacientesModi: null,
          dataPacientesModal: null,
          selectTable: false,
          errorMessage: null,
        }),
    }),
    {
      name: "pacientes",
      // Persistimos solo lo necesario; no persistimos errores ni backups.
      partialize: (state) => ({
        dataPaciente: state.dataPaciente,
        dniInput: state.dniInput,
        estado: state.estado,
      }),
    },
  ),
);
