import { create } from "zustand";

type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Doctor {
  iddoctor: number;
  ndoctor: string;
  nespecialidad: string;
}

export interface Horario {
  id: string;
  doctorId: number;
  dia: DayId;
  hora_ini: string;
  hora_fin: string;
}

interface Estado {
  // doctores y selección
  doctoresData: Doctor[];
  setDoctoresData: (rows: Doctor[]) => void;

  seleccionado: { doctorId: number | null; dia: DayId | null };
  doctorSeleccionado: Doctor | null;
  diaSeleccionado: DayId | null;
  seleccionarDoctor: (id: number) => void;
  seleccionarDia: (dia: DayId) => void;
  editingHorario: Horario | null; // <-- acá está el cambio
  setEditingHorario: (h: Horario | null) => void;

  // horarios (lista PLANA)
  horarios: Horario[];
  horarioSeleccionadoId: string | null;
  setHorarioSeleccionadoId: (id: string | null) => void;
  // helpers
  horariosSeleccionados: () => Horario[];

  // mutaciones básicas
  agregarHorario: (h: { hora_ini: string; hora_fin: string }) => void;
  eliminarHorario: (id: string) => void;
}

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

export const useConfiguracionHorariosStore = create<Estado>((set, get) => ({
  doctoresData: [],
  setDoctoresData: (rows) => set({ doctoresData: rows }),

  seleccionado: { doctorId: null, dia: null },
  doctorSeleccionado: null,
  diaSeleccionado: null,
  seleccionarDoctor: (id) =>
    set((s) => ({
      seleccionado: { ...s.seleccionado, doctorId: id },
      horarioSeleccionadoId: null,
    })),
  seleccionarDia: (dia) =>
    set((s) => ({
      seleccionado: { ...s.seleccionado, dia },
      horarioSeleccionadoId: null,
    })),

  editingHorario: null as Horario | null,
  setEditingHorario: (h: Horario | null) => set({ editingHorario: h }),
  horarios: [],

  horarioSeleccionadoId: null,
  setHorarioSeleccionadoId: (id) => set({ horarioSeleccionadoId: id }),
  horariosSeleccionados: () => {
    const { horarios, seleccionado } = get();
    const { doctorId, dia } = seleccionado;
    if (!doctorId || !dia) return [];
    return horarios.filter((h) => h.doctorId === doctorId && h.dia === dia);
  },

  agregarHorario: ({ hora_ini, hora_fin }) => {
    const { seleccionado } = get();
    const { doctorId, dia } = seleccionado;
    if (!doctorId || !dia) return; // sin selección no hacemos nada

    const nuevo: Horario = { id: uid(), doctorId, dia, hora_ini, hora_fin };
    set((s) => ({ horarios: [...s.horarios, nuevo] }));
  },
  editarHorario: (id, patch) =>
    set((s) => ({
      horarios: s.horarios.map((h) => (h.id === id ? { ...h, ...patch } : h)),
    })),

  eliminarHorario: (id) =>
    set((s) => ({
      horarios: s.horarios.filter((h) => h.id !== id),
      // si borraste el seleccionado, lo limpiás
      horarioSeleccionadoId: s.horarioSeleccionadoId === id ? null : s.horarioSeleccionadoId,
    })),
}));
