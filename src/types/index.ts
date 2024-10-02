import { z } from 'zod';

export const accountSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  email: z.string(),
  fnac: z.string(),
  gen: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type NewAccount = z.infer<typeof accountSchema>;
export type Account = Pick<NewAccount, 'email' | 'password'>;

export type FormData = {
  email: Account['email'];
};

/* Especialidades */
export const especialidadesSchema = z.object({
  ID: z.number(),
  NOMBRE_ESPECIALIDAD: z.string(),
});

export const turnosEspecialidadesSchema = z.array(especialidadesSchema);
