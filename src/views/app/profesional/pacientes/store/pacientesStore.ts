import { create } from "zustand";
import { persist } from "zustand/middleware";

type Estado = "i" | "c" | "m";

// export type PacienteApi = {
//   apellido: string;
//   codarea: string;
//   codarea1: string;
//   credencial: string;
//   ctrib: number;
//   cuil: string;
//   dni: string;
//   domicilio1: string;
//   domicilio2: string;
//   email: string;
//   f_alta: string;
//   fnacim: string;
//   idcodloc: number;
//   idestadociv: number;
//   idosocial: number;
//   idpaciente: number;
//   idplan: number;
//   idsexo: number;
//   nlocalidad: string | null;
//   nombre: string;
//   nosocial: string | null;
//   nplan: string | null;
//   nprovincia: string | null;
//   ntelefono1: string;
//   obs: string;
//   tdoc: number;
//   telefono: string;
//   telefono1: string;
// };

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

      reset: () =>
        set({
          estado: "i",
          dniInput: "",
          dataPaciente: null,
          backupPaciente: null,
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
