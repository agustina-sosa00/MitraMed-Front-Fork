import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InformeTurnosStore {
  shiftReportData: any;
  selectedDates: { from: string; to: string };
  setSelectedDates: (dates: { from: string; to: string }) => void;
  clearShiftReportData: () => void;
  setShiftReportData: (data: any) => unknown;
}

export const useInformeTurnosStore = create<InformeTurnosStore>()(
  persist(
    (set) => ({
      shiftReportData: null,
      selectedDates: { from: "", to: "" },
      setShiftReportData: (data) => set({ shiftReportData: data }),
      setSelectedDates: (dates) => set({ selectedDates: dates }),
      clearShiftReportData: () =>
        set({ shiftReportData: null, selectedDates: { from: "", to: "" } }),
    }),
    {
      name: "shift-report-storage", // nombre de la clave en localStorage
    },
  ),
);
