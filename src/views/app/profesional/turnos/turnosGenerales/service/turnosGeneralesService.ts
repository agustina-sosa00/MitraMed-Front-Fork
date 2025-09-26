import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";

export async function obtenerDoctores() {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerDoctores.php?_i={"_e":"${empresa}","_m":"${modo}"}`;

    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error obteniendo datos de los usuarios: ${error}`);
  }
}

export async function obtenerTurnosDiarios({ fini, ffin, iddoctor }) {
  try {
    const { empresa, modo, entorno, tusuario } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerTurnosDiarios.php?_i={"_e":"${empresa}","_m":"${modo}","_tu":"${tusuario}","_id":"${iddoctor}","_fini":"${fini}","_ffin":"${ffin}"}`;

    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
