import { create } from "zustand";
import { OdontogramaData, TeethIdsState, ToothChangeTuple } from "../types/odontogramaTypes";
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

  contextMenu: number | null;
  setContextMenu: (v: number | null) => void;

  toothSelect: number;
  setToothSelect: (v: number) => void;

  editOdontograma: boolean;
  setEditOdontograma: (v: boolean) => void;

  teethChanged: ToothChangeTuple[];
  setTeethChanged: (
    v: ToothChangeTuple[] | ((prev: ToothChangeTuple[]) => ToothChangeTuple[]),
  ) => void;
  idPaciente: string;
  setIdPaciente: (v: string) => void;

  errorState: string;
  setErrorState: (v: string) => void;

  handleCleanPatient: () => void;

  handleCancelEdit: () => void;
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

      contextMenu: null,
      setContextMenu: (v) => set({ contextMenu: v }),

      toothSelect: 0,
      setToothSelect: (v) => set({ toothSelect: v }),

      editOdontograma: false,
      setEditOdontograma: (v) => set({ editOdontograma: v }),

      teethChanged: [],
      setTeethChanged: (v) =>
        set((state) => ({
          teethChanged: typeof v === "function" ? v(state.teethChanged) : v,
        })),
      idPaciente: "",
      setIdPaciente: (v) => set({ idPaciente: v }),

      errorState: "",
      setErrorState: (v) => set({ errorState: v }),

      handleCleanPatient: () =>
        set({
          hasConfirmed: false,
          uiLoading: false,
          dniInput: "",
          idPaciente: "",
          teethIdsState: {},
          originalData: {},
        }),

      handleCancelEdit: () =>
        set((state) => ({
          teethChanged: [],
          teethIdsState: state.originalData,
          editOdontograma: false,
        })),
    }),
    {
      name: "odontograma-store",
      partialize: (state) => ({ dniInput: state.dniInput }),
    },
  ),
);
