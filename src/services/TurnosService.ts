import api from '../lib/axios';
import { isAxiosError } from 'axios';
import { Doctor } from '../types';
// import { turnosEspecialidadesSchema } from '../types';

export async function obtenerEspecialidades() {
  try {
    const { data } = await api('/turnos/obtener_especialidades');
    // const response = turnosEspecialidadesSchema.safeParse(data);
    // if (response.success) return response.data;
    // console.log(data);
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

export async function obtenerDoctores(especialidadId: string): Promise<Doctor[]> {
  try {
    const { data } = await api(`/turnos/obtener_doctores/${especialidadId}`);

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
