import { apiPhp } from "@/lib/axiosPhp";

export async function obtenerTurnosDiarios({ fini, ffin }) {
  try {
    const empresa = localStorage.getItem("_e");
    const modo = localStorage.getItem("_m");
    const tusuario = localStorage.getItem("_tu");
    const iddoctor = localStorage.getItem("_id");

    const url = `/apinovades/mitramed/obtenerTurnosDiarios.php?_i={"_e":"${empresa}","_m":"${modo}","_tu":"${tusuario}","_id":"${iddoctor}","_fini":"${fini}","_ffin":"${ffin}"}`;

    const response = await apiPhp(url);

    let raw = response.data;
    if (typeof raw === "string") {
      const idx = raw.indexOf("{");
      const cortado = idx !== -1 ? raw.slice(idx) : raw;
      // console.log(cortado);
      return JSON.parse(cortado);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
}
