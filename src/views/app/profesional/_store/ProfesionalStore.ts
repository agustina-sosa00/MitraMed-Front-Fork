import { create } from "zustand";

interface ProfesionalStore {
  loader: boolean;
  setLoader: (value: boolean) => void;
  loaderKey: string;
  setLoaderKey: (value: string) => void;
}

export const useProfesionalStore = create<ProfesionalStore>()((set) => ({
  loader: false,
  setLoader: (value) => set({ loader: value }),
  loaderKey: "",
  setLoaderKey: (value) => set({ loaderKey: value }),
}));
