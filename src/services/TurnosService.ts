import api from '../lib/axios';
import { isAxiosError } from 'axios';
import { Doctor, Horario, Turno } from '../types';
// import { turnosEspecialidadesSchema } from '../types';

export async function obtenerDatosUsuario() {
  try {
    const { data } = await api('/turnos/obtener_datosusuario');
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

export async function actualizarEmail(email: string) {
  try {
    const { data } = await api.patch('/turnos/actualizar_emailusuario', { email });
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

export async function obtenerDoctores(idEspecialidad: string): Promise<Doctor[]> {
  try {
    const { data } = await api(`/turnos/obtener_doctores/${idEspecialidad}`);

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

export async function obtenerDiasSinAtencion({
  idEspecialidad,
  idDoctor,
}: {
  idEspecialidad: string;
  idDoctor: string;
}): Promise<number[]> {
  try {
    const { data } = await api(`/turnos/obtener_diassinatencion/${idEspecialidad}/${idDoctor}`);
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

export async function obtenerTurnos({
  idEspecialidad,
  idDoctor,
  fecha,
}: {
  idEspecialidad: string;
  idDoctor: string;
  fecha: string;
}) {
  try {
    const { data } = await api<Horario[]>(
      `/turnos/obtener_turnos/${idEspecialidad}/${idDoctor}/${fecha}`
    );
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

export async function confirmarTurno(dataTurno: Turno) {
  try {
    // console.log(dataTurno);
    const { data } = await api.post('/turnos/confirmar_turno', dataTurno);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
      // console.log(error.response.data.error);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}
