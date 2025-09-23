import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";

export async function obtenerTurnosDiarios({ fini, ffin }) {
  try {
    const { empresa, modo, entorno, tusuario, iddoctor } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerTurnosDiarios.php?_i={"_e":"${empresa}","_m":"${modo}","_tu":"${tusuario}","_id":"${iddoctor}","_fini":"${fini}","_ffin":"${ffin}"}`;

    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
