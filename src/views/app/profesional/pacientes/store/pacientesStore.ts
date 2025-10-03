import { create } from "zustand";
import { persist } from "zustand/middleware";

type Estado = "i" | "c" | "m";

export type PacienteApi = {
  apellido: string;
  codarea: string;
  codarea1: string;
  credencial: string;
  ctrib: number;
  cuil: string;
  dni: string;
  domicilio1: string;
  domicilio2: string;
  email: string;
  f_alta: string;
  fnacim: string;
  idcodloc: number;
  idestadociv: number;
  idosocial: number;
  idpaciente: number;
  idplan: number;
  idsexo: number;
  nlocalidad: string | null;
  nombre: string;
  nosocial: string | null;
  nplan: string | null;
  nprovincia: string | null;
  ntelefono1: string;
  obs: string;
  tdoc: number;
  telefono: string;
  telefono1: string;
};

interface PacientesStore {
  estado: Estado;
  setEstado: (v: Estado) => void;

  dniInput: string;
  setDniInput: (v: string) => void;

  dataPaciente: PacienteApi | null;
  setDataPaciente: (v: PacienteApi | null) => void;

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

      reset: () =>
        set({
          estado: "i",
          dniInput: "",
          dataPaciente: null,
        }),
    }),
    {
      name: "pacientes",

      partialize: (state) => ({ dataPaciente: state.dataPaciente }),
    },
  ),
);
