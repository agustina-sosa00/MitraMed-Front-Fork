import api from '../lib/axios';
import { isAxiosError } from 'axios';
// import { turnosEspecialidadesSchema } from '../types';

export async function obtenerEspecialidades() {
  try {
    const { data } = await api('/turnos/obtener_especialidades');
    // const response = turnosEspecialidadesSchema.safeParse(data);
    // if (response.success) return response.data;
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
      // console.log(error.response.data);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}
