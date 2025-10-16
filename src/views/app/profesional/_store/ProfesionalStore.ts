import { create } from "zustand";

interface ProfesionalStore {
  loader: boolean;
  setLoader: (value: boolean) => void;
}

export const useProfesionalStore = create<ProfesionalStore>()((set) => ({
  loader: false,
  setLoader: (value) => set({ loader: value }),
}));
