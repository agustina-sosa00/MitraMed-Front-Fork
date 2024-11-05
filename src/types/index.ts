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
  iddoctor: number;
  iddia: number;
  idhorario: number;
  hora_ini: string;
}
