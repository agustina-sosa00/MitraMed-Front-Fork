import api from '../lib/axios';
import { isAxiosError } from 'axios';
import { turnosEspecialidadesSchema } from '../types';

export async function getEspecialidades() {
  try {
    const { data } = await api('/especialidad');
    const response = turnosEspecialidadesSchema.safeParse(data);

    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}
