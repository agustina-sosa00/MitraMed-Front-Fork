import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";

export const obtenerUsuProfesional = async (data) => {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerUsuProfesional.php?_i={"_e":"${empresa}","_m":"${modo}","_u":"${data.usuario}","_p":"${data.password}"}`;

    // console.log(url);

    const response = await apiPhp(url);

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
