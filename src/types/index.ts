import { z } from 'zod';

export const accountSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  email: z.string(),
  fnac: z.string(),
  genero: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type NewAccount = z.infer<typeof accountSchema>;
export type Account = Pick<NewAccount, 'email' | 'password'>;

/* Especialidades */
export interface Especialidad {
  idespecialidad: number;
  nombre: string;
}

export interface Doctor {
  iddoctor: number;
  nombre: string;
  apellido: string;
}

export interface Horario {
  hora_ini: string;
  hora_fin: string;
  habilitado: number;
}

export interface Turno {
  idEspecialidad: string;
  nombreEspecialidad: string;
  idDoctor: string;
  nombreDoctor: string;
  fecha: string;
  turno: number;
  horaTurno: string;
}

export type TurnoData = Pick<
  Turno,
  'nombreEspecialidad' | 'nombreDoctor' | 'fecha' | 'turno' | 'horaTurno'
>;
