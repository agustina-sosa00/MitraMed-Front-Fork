import { apiPhp } from "@/lib/axiosPhp";

export async function obtenerUsuariosProf() {
  try {
    const response = await apiPhp(
      `/apinovades/mitramed/obtenerUsuariosProf.php?_i={"_e":"20","_m":"homo"}`,
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos de los usuarios: ${error}`);
  }
}

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

export async function grabarUsuarioProf(data: any) {
  try {
    const empresa = localStorage.getItem("_e");
    const modo = localStorage.getItem("_m");

    const payload = {
      empresa,
      modo,
      ...data,
    };

    const response = await apiPhp.post(`/apinovades/mitramed/grabarUsuarioProf.php`, payload);

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
