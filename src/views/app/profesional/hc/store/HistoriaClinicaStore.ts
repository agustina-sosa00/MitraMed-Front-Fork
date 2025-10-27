import { create } from "zustand";
import { persist } from "zustand/middleware";
type DataPaciente = {
  hc: {
    detalle: string;
    fecha: string;
    iddoctor: number;
    idhistoria: number;
    idopera: string | null;
    idpaciente: number;
    ndoctor: string;
    obs: string;
  }[];
  paciente: {
    nombre: string;
    apellido: string;
    dni: string;
    fnacim: string;
    edad: number;
    idosocial: number;
    idpaciente: number;
    nosocial: null | string;
    idplan: number;
    nplan: null | string;
  };
};

type HcRow = {
  id: string | number;
  idhistoria?: number | string;
  fecha: string;
  detalle: string;
  ndoctor: string;
  obs: string;
  idopera?: string;
  iddoctor?: number;
};

interface HistorialClinicoStore {
  dataPaciente: DataPaciente | null;
  setDataPaciente: (v: DataPaciente | null) => void;

  editMode: boolean;
  setEditMode: (v: boolean) => void;

  hcSelected: HcRow | null;
  setHcSelected: (v: HcRow | null) => void;

  refetchHC: boolean;
  setRefetchHC: (v: boolean) => void;

  idPaciente: number | null;
  setIdPaciente: (v: number | null) => void;

  dniHistory: string;
  setDniHistory: (v: string) => void;

  hasConfirmed: boolean;
  setHasConfirmed: (v: boolean) => void;

  uiLoading: boolean;
  setUiLoading: (v: boolean) => void;

  dniInput: string;
  setDniInput: (v: string) => void;

  hasNewRegistroChanges: boolean;
  setHasNewRegistroChanges: (v: boolean) => void;

  errorState: string;
  setErrorState: (v: string) => void;

  previewOpen: boolean;
  setPreviewOpen: (v: boolean) => void;

  showModal: boolean;
  setShowModal: (v: boolean) => void;

  loadingBlob: boolean;
  setLoadingBlob: (v: boolean) => void;

  previewBlob: Blob | null;
  setPreviewBlob: (v: Blob | null) => void;

  previewExt: string;
  setPreviewExt: (v: string) => void;

  previewPage: number;
  setPreviewPage: (v: number | ((prev: number) => number)) => void;

  previewNumPages: number;
  setPreviewNumPages: (v: number) => void;

  downloading: boolean;
  setDownloading: (v: boolean) => void;

  reset: () => void;
}

export const useHistorialClinicoStore = create<HistorialClinicoStore>()(
  persist(
    (set) => ({
      dataPaciente: null,
      setDataPaciente: (v) => set({ dataPaciente: v }),

      editMode: false,
      setEditMode: (v) => set({ editMode: v }),

      hcSelected: null,
      setHcSelected: (v) => set({ hcSelected: v }),

      refetchHC: false,
      setRefetchHC: (v) => set({ refetchHC: v }),

      idPaciente: null,
      setIdPaciente: (v) => set({ idPaciente: v }),

      dniHistory: "",
      setDniHistory: (v) => set({ dniHistory: v }),

      hasConfirmed: false,
      setHasConfirmed: (v) => set({ hasConfirmed: v }),

      uiLoading: false,
      setUiLoading: (v) => set({ uiLoading: v }),

      dniInput: "",
      setDniInput: (v) => set({ dniInput: v }),

      hasNewRegistroChanges: false,
      setHasNewRegistroChanges: (v) => set({ hasNewRegistroChanges: v }),

      errorState: "",
      setErrorState: (v) => set({ errorState: v }),

      previewOpen: false,
      setPreviewOpen: (v) => set({ previewOpen: v }),

      showModal: false,
      setShowModal: (v) => set({ showModal: v }),

      loadingBlob: false,
      setLoadingBlob: (v) => set({ loadingBlob: v }),

      previewBlob: null,
      setPreviewBlob: (v) => set({ previewBlob: v }),

      previewExt: "",
      setPreviewExt: (v) => set({ previewExt: v }),

      previewPage: 1,
      setPreviewPage: (v) =>
        set((state) => ({
          previewPage: typeof v === "function" ? v(state.previewPage) : v,
        })),

      previewNumPages: 1,
      setPreviewNumPages: (v) => set({ previewNumPages: v }),

      downloading: false,
      setDownloading: (v) => set({ downloading: v }),

      reset: () =>
        set({
          dataPaciente: null,
          idPaciente: null,
          dniHistory: "",
          hasConfirmed: false,
          uiLoading: false,
          dniInput: "",
          hasNewRegistroChanges: false,
        }),
    }),
    {
      name: "historial-clinico-store",
      partialize: (state) => ({ hcSelected: state.hcSelected }),
    },
  ),
);
