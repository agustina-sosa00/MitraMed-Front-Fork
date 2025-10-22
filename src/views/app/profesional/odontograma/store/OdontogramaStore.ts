import { create } from "zustand";
import { OdontogramaData, TeethIdsState } from "../types/odontogramaTypes";
import { persist } from "zustand/middleware";

interface OdontogramaStore {
  dniOdontograma: string;
  setDniOdontograma: (v: string) => void;

  originalData: TeethIdsState;
  setOriginalData: (v: TeethIdsState) => void;

  teethIdsState: TeethIdsState;
  setTeethIdsState: (v: TeethIdsState | ((prev: TeethIdsState) => TeethIdsState)) => void;

  hasConfirmed: boolean;
  setHasConfirmed: (v: boolean) => void;

  uiLoading: boolean;
  setUiLoading: (v: boolean) => void;

  dniInput: string;
  setDniInput: (v: string) => void;

  odontogramaData: OdontogramaData | null;
  setOdontogramaData: (v: OdontogramaData | null) => void;
}

export const useOdontogramaStore = create<OdontogramaStore>()(
  persist(
    (set) => ({
      dniOdontograma: "",
      setDniOdontograma: (v) => set({ dniOdontograma: v }),

      originalData: {},
      setOriginalData: (v) => set({ originalData: v }),

      teethIdsState: {} as TeethIdsState,
      setTeethIdsState: (v) =>
        set((state) => ({
          teethIdsState:
            typeof v === "function"
              ? (v as (p: TeethIdsState) => TeethIdsState)(state.teethIdsState)
              : v,
        })),

      hasConfirmed: false,
      setHasConfirmed: (v) => set({ hasConfirmed: v }),

      uiLoading: false,
      setUiLoading: (v) => set({ uiLoading: v }),

      dniInput: "",
      setDniInput: (v) => set({ dniInput: v }),

      odontogramaData: null,
      setOdontogramaData: (v) => set({ odontogramaData: v }),
    }),
    {
      name: "odontograma-store",
      partialize: (state) => ({ dniInput: state.dniInput }),
    },
  ),
);
