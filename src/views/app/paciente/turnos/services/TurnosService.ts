import { Doctor, Horario, Turno, Usuario } from "@/views/auth/types";
import api from "../../../../../lib/axios";
import { isAxiosError } from "axios";

// Services de usuarios
export async function obtenerDatosUsuario() {
  try {
    const { data } = await api<Usuario[]>("/turnos/obtener_datosusuario");

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function actualizarTelefono({
  codarea,
  telefono,
}: {
  codarea: string;
  telefono: string;
}) {
  try {
    const { data } = await api.patch("/turnos/actualizar_telefonousuario", {
      codarea,
      telefono,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function actualizarEmail(email: string) {
  try {
    const { data } = await api.patch("/turnos/actualizar_emailusuario", {
      email,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function obtenerTurnosUsuario() {
  try {
    const { data } = await api("/turnos/obtener_turnosusuario");

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function obtenerTurnosPendientes() {
  try {
    const { data } = await api("/turnos/obtener_turnospendientes");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function obtenerTurnosHistoricos() {
  try {
    const { data } = await api("/turnos/obtener_turnoshistoricos");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function anularTurnoUsuario(idTurno: number) {
  try {
    const { data } = await api.patch("/turnos/anular_turnousuario", {
      idTurno,
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

// Services de doctores y turnos
export async function obtenerEspecialidades() {
  try {
    const { data } = await api("/turnos/obtener_especialidades");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
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
    } else {
      throw new Error("Hubo un error...");
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
    const { data } = await api(`/turnos/obtener_diasatencion/${idEspecialidad}/${idDoctor}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

// export async function prueba({
//   idEspecialidad,
//   idDoctor,
//   fecha,
// }: {
//   idEspecialidad: string;
//   idDoctor: string;
//   fecha: string;
// }) {
//   try {
//     const { data } = await api(`/turnos/prueba/${idEspecialidad}/${idDoctor}/${fecha}`);
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//       // console.log(error.response.data);
//     } else {
//       throw new Error('Hubo un error...');
//     }
//   }
// }

export async function obtenerTurnosDisponibles({
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
      `/turnos/obtener_turnosdisponibles/${idEspecialidad}/${idDoctor}/${fecha}`,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

export async function confirmarTurno(dataTurno: Turno) {
  try {
    const { data } = await api.post("/turnos/confirmar_turno", dataTurno);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Hubo un error...");
    }
  }
}

// export async function pruebaGrabarTurno(dataTurno: Turno) {
//   try {
//     const { data } = await api.post('/turnos/prueba', dataTurno);

//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       throw new Error(error.response.data.error);
//       // console.log(error.response.data.error);
//     } else {
//       throw new Error('Hubo un error...');
//     }
//   }
// }
