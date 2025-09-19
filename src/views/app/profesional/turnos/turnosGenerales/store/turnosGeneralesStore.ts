import { getToday } from "@/utils/index";
import { create } from "zustand";

interface Doctor {
  id: number;
  ndoctor: string;
  [key: string]: any;
}

interface TurnosGeneralesStore {
  doctoresData: Doctor[];
  setDoctoresData: (doctores: Doctor[]) => void;
  doctorSeleccionado: Doctor | null;
  setDoctorSeleccionado: (doctor: Doctor | null) => void;
  diaSeleccionado: string;
  setDiaSeleccionado: (dia: string) => void;
  turnosData: Record<string, any>[];
  setTurnosData: (turnos: Record<string, any>[]) => void;
}

export const useTurnosGeneralesStore = create<TurnosGeneralesStore>((set) => ({
  doctoresData: [],
  setDoctoresData: (doctores) => set({ doctoresData: doctores }),
  doctorSeleccionado: null,
  setDoctorSeleccionado: (doctor) => set({ doctorSeleccionado: doctor }),
  diaSeleccionado: getToday(),
  setDiaSeleccionado: (dia) => set({ diaSeleccionado: dia }),
  turnosData: [],
  setTurnosData: (turnos) => set({ turnosData: turnos }),
}));
