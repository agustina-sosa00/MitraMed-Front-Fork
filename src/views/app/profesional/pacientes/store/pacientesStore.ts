import { create } from "zustand";
import { persist } from "zustand/middleware";
type Estado = "i" | "c" | "m";
interface PacientesStore {
  estado: Estado;
  setEstado: (v: Estado) => void;
}

export const usePacientesStore = create<PacientesStore>()(
  persist(
    (set) => ({
      estado: "i",
      setEstado: (v) => set({ estado: v }),
    }),
    { name: "estados" },
  ),
);
