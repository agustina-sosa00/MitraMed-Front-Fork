import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";
// import { mockTurnos } from "../mock/index";

export async function obtenerTurnosDoctoresDia(fecha: string) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerTurnosDoctoresDia.php?_i={"_e":"${empresa}","_m":"${modo}","_f":"${fecha}"}`,
    );

    // console.log(response);

    return response.data;
    // return { data: mockTurnos };
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// export async function obtenerTurnosPacientesDia(fecha: string) {
//   try {
//     const { empresa, modo, entorno } = getLocalStorageParams();

//     const response = await apiPhp(
//       `/${entorno}/mitramed/obtenerTurnosDoctoresDia.php?_i={"_e":"${empresa}","_m":"${modo}","_f":"${fecha}"}`,
//     );

//     // console.log(response);

//     return response.data;
//     // return { data: mockTurnos };
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// }

export async function obtenerDoctoresDatosEmail(fecha: string) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerProcesosMov.php?_i={"_e":"${empresa}","_m":"${modo}","_f":"${fecha}"}`;

    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function enviarEmailRecordatorio(fecha: string, body: any) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/twilio/enviaEmail.php?_i={"_e":"${empresa}","_m":"${modo}","fecha":"${fecha}"}`;

    const response = await apiPhp.post(url, body);

    console.log(url);
    console.log(body);

    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
