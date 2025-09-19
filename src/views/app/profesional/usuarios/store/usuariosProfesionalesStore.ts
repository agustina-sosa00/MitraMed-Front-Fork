import { create } from "zustand";

type UsuarioProf = {
  id: string | number;
  rowId?: number;
  idprofesional: number;
  usuario: string;
  nusuario: string;
  iddoctor: number;
  ndoctor: string;
  tusuario: number;
  tipo: string;
  passprof: string;
};

type Doctores = {
  iddoctor: number;
  ndoctor: string;
};

interface UsuariosProfesionalesProps {
  dataUsuarios: UsuarioProf[];
  setDataUsuarios: (data: UsuarioProf[]) => void;
  dataDoctores: Doctores[];
  setDataDoctores: (data: Doctores[]) => void;
  shouldRefetchUsuarios: boolean;
  triggerRefetchUsuarios: () => void;
  resetRefetchFlag: () => void;
  enabledFetchUsu: boolean;
  setEnabledFetchUsu: (enabled: boolean) => void;
  editMode: boolean;
  setEditMode: (edit: boolean) => void;
  selectEnabled: boolean;
  setSelectEnabled: (enabled: boolean) => void;
  usuarioSeleccionado?: UsuarioProf;
  setUsuarioSeleccionado: (usuario: UsuarioProf | undefined) => void;
  updateUsuarioSeleccionado: () => void;
  // Estados de la aplicación
  consulta: boolean;
  setConsulta: (consulta: boolean) => void;
  edicion: boolean;
  setEdicion: (edicion: boolean) => void;
  alta: boolean;
  setAlta: (alta: boolean) => void;
}

export const useUsuariosProfesionalStore = create<UsuariosProfesionalesProps>((set, get) => ({
  dataUsuarios: [],
  setDataUsuarios: (data) => set({ dataUsuarios: data }),
  dataDoctores: [],
  setDataDoctores: (data) => set({ dataDoctores: data }),
  shouldRefetchUsuarios: false,
  triggerRefetchUsuarios: () => set({ shouldRefetchUsuarios: true }),
  resetRefetchFlag: () => set({ shouldRefetchUsuarios: false }),
  enabledFetchUsu: true,
  setEnabledFetchUsu: (enabled) => set({ enabledFetchUsu: enabled }),
  editMode: false,
  setEditMode: (edit) => set({ editMode: edit }),
  selectEnabled: true,
  setSelectEnabled: (enabled) => set({ selectEnabled: enabled }),
  usuarioSeleccionado: undefined,
  setUsuarioSeleccionado: (usuario) => set({ usuarioSeleccionado: usuario }),
  updateUsuarioSeleccionado: () => {
    const { usuarioSeleccionado, dataUsuarios } = get();
    if (usuarioSeleccionado && dataUsuarios.length > 0) {
      // Buscar el usuario actualizado por su ID
      const usuarioActualizado = dataUsuarios.find(
        (u) => u.idprofesional === usuarioSeleccionado.idprofesional,
      );
      if (usuarioActualizado) {
        set({ usuarioSeleccionado: usuarioActualizado });
      }
    }
  },
  // Estados de la aplicación
  consulta: true,
  setConsulta: (consulta) => set({ consulta }),
  edicion: false,
  setEdicion: (edicion) => set({ edicion }),
  alta: false,
  setAlta: (alta) => set({ alta }),
}));
