import { apiPhp } from "@/lib/axiosPhp";

export async function obtenerTurnosDiarios({ fini, ffin }) {
  try {
    const empresa = localStorage.getItem("_e");
    const modo = localStorage.getItem("_m");
    const tusuario = localStorage.getItem("_tu");
    const iddoctor = localStorage.getItem("_id");

    const response = await apiPhp(
      `/apinovades/mitramed/obtenerTurnosDiarios.php?_i={"_e":"${empresa}","_m":"${modo}","_tu":"${tusuario}","_id":"${iddoctor}","_fini":"${fini}","_ffin":"${ffin}"}`
    );

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
