import { z } from "zod";

export const accountSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  email: z.string(),
  fnac: z.string(),
  codarea: z.string(),
  tel: z.string(),
  genero: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  dni: z.string().optional(),
});

export type NewAccount = z.infer<typeof accountSchema>;
export type Account = Pick<NewAccount, "email" | "password" | "dni">;

export type Usuario = {
  nombre: string;
  apellido: string;
  email: string;
  codarea: string;
  telefono: string;
  fnac: string;
  genero: string;
};

export type UserGoogle = {
  idToken: string;
  nombre: string;
  apellido: string;
  email: string;
  fnac: string;
  genero: string;
};

export type TurnosUsuario = {
  idturno: number;
  nespecialidad: string;
  ndoctor: string;
  fecha: string;
  dia: string;
  hora_ini: string;
};

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
  idhorario: number;
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
  idhorario: number;
  hora_ini: string;
  hora_fin: string;
}
