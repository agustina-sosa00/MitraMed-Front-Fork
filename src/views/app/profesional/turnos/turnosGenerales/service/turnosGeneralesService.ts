import { apiPhp } from "@/lib/axiosPhp";

export async function obtenerDoctores() {
  try {
    const response = await apiPhp(
      `/apinovades/mitramed/obtenerDoctores.php?_i={"_e":"20","_m":"homo"}`,
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos de los usuarios: ${error}`);
  }
}

export async function obtenerTurnosDiarios({ fini, ffin, iddoctor }) {
  try {
    const empresa = localStorage.getItem("_e");
    const modo = localStorage.getItem("_m");
    const tusuario = localStorage.getItem("_tu");

    const url = `/apinovades/mitramed/obtenerTurnosDiarios.php?_i={"_e":"${empresa}","_m":"${modo}","_tu":"${tusuario}","_id":"${iddoctor}","_fini":"${fini}","_ffin":"${ffin}"}`;

    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
