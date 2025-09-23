import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";

export async function obtenerInformeTurnos({ fini, ffin }) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerInformeTurnos.php?_i={"_e":"${empresa}","_m":"${modo}","_fini":"${fini}","_ffin":"${ffin}"}`,
    );

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
