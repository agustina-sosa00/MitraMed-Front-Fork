import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InformeTurnosStore {
  informeTurnosData: any;
  selectedDates: { from: string; to: string };
  setSelectedDates: (dates: { from: string; to: string }) => void;
  clearInformeTurnosData: () => void;
  setInformeTurnosData: (data: any) => unknown;
}

export const useInformeTurnosStore = create<InformeTurnosStore>()(
  persist(
    (set) => ({
      informeTurnosData: null,
      selectedDates: { from: "", to: "" },
      setInformeTurnosData: (data) => set({ informeTurnosData: data }),
      setSelectedDates: (dates) => set({ selectedDates: dates }),
      clearInformeTurnosData: () =>
        set({ informeTurnosData: null, selectedDates: { from: "", to: "" } }),
    }),
    {
      name: "informe-turnos-storage", // nombre de la clave en localStorage
    },
  ),
);
