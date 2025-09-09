import { apiPhp } from "@/lib/axiosPhp";

export async function obtenerInformeTurnos({ fini, ffin }) {
  try {
    const empresa = localStorage.getItem("_e");
    const modo = localStorage.getItem("_m");

    const response = await apiPhp(
      `/apinovades/mitramed/obtenerInformeTurnos.php?_i={"_e":"${empresa}","_m":"${modo}","_fini":"${fini}","_ffin":"${ffin}"}`
    );

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
