import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";

export async function obtenerUsuariosProf() {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerUsuariosProf.php?_i={"_e":"${empresa}","_m":"${modo}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos de los usuarios: ${error}`);
  }
}

export async function obtenerDoctores() {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerDoctores.php?_i={"_e":"${empresa}","_m":"${modo}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos de los usuarios: ${error}`);
  }
}

export async function grabarUsuarioProf(data: any) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const payload = {
      empresa,
      modo,
      ...data,
    };

    const response = await apiPhp.post(`/${entorno}/mitramed/grabarUsuarioProf.php`, payload);

    return response.data;
  } catch (error: any) {
    const errorData = error?.response?.data;

    // Verificar si es un error de duplicado
    if (errorData && errorData.message) {
      const duplicateMatch = errorData.message.match(/Key \((.+?)\)=\((.+?)\)/);
      if (duplicateMatch && duplicateMatch[1] === "usuariopro") {
        // Error específico de usuario duplicado
        const usuarioDuplicado = duplicateMatch[2];
        throw new Error(`DUPLICATE_USER:${usuarioDuplicado}`);
      }
    }
  }
}
