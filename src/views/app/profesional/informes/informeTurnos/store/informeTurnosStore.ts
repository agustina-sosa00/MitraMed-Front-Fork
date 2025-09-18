import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InformeTurnosStore {
  informeTurnosData: any;
  selectedDates: { from: string; to: string };
  filtroTipo: string;
  filtroValue: string;
  hasSearched: boolean;
  filteredRows: any[];
  totals: { totalRegistros: number; totalImportes: number };
  setSelectedDates: (dates: { from: string; to: string }) => void;
  clearInformeTurnosData: () => void;
  setInformeTurnosData: (data: any) => unknown;
  setFiltroTipo: (tipo: string) => void;
  setFiltroValue: (valor: string) => void;
  setHasSearched: (v: boolean) => void;
  setFilteredRows: (rows: any[]) => void;
  setTotals: (totals: { totalRegistros: number; totalImportes: number }) => void;
}

export const useInformeTurnosStore = create<InformeTurnosStore>()(
  persist(
    (set) => ({
      informeTurnosData: null,
      selectedDates: { from: "", to: "" },
      filtroTipo: "nespecialidad",
      filtroValue: "",
      hasSearched: false,
      filteredRows: [],
      totals: { totalRegistros: 0, totalImportes: 0 },
      setInformeTurnosData: (data) => set({ informeTurnosData: data }),
      setSelectedDates: (dates) => set({ selectedDates: dates }),
      clearInformeTurnosData: () =>
        set({
          informeTurnosData: null,
          selectedDates: { from: "", to: "" },
          filtroTipo: "nespecialidad",
          filtroValue: "",
          hasSearched: false,
          filteredRows: [],
          totals: { totalRegistros: 0, totalImportes: 0 },
        }),
      setFiltroTipo: (tipo) => set({ filtroTipo: tipo }),
      setFiltroValue: (valor) => set({ filtroValue: valor }),
      setHasSearched: (v) => set({ hasSearched: v }),
      setFilteredRows: (rows) => set({ filteredRows: rows }),
      setTotals: (totals) => set({ totals }),
    }),
    {
      name: "informe-turnos-storage", // nombre de la clave en localStorage
    },
  ),
);
