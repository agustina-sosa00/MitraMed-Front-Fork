import { create } from "zustand";

interface UsuariosProfState {
  shouldRefetchUsuarios: boolean;
  triggerRefetchUsuarios: () => void;
  enabledFetchUsu: boolean;
  setEnabledFetchUsu: (enabled: boolean) => void;
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
  selectEnabled: boolean;
  setSelectEnabled: (enabled: boolean) => void;
  usuarioSeleccionado?: any;
  setUsuarioSeleccionado: (usuario: any) => void;
}

export const useUsuariosProfStore = create<UsuariosProfState>((set) => ({
  shouldRefetchUsuarios: false,
  triggerRefetchUsuarios: () => set({ shouldRefetchUsuarios: true }),
  enabledFetchUsu: true,
  setEnabledFetchUsu: (enabled) => set({ enabledFetchUsu: enabled }),
  editMode: false,
  setEditMode: (edit) => set({ editMode: edit }),
  selectEnabled: true,
  setSelectEnabled: (enabled) => set({ selectEnabled: enabled }),
  usuarioSeleccionado: undefined,
  setUsuarioSeleccionado: (usuario) => set({ usuarioSeleccionado: usuario }),
}));
