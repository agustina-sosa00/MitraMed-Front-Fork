import { apiPhp } from "@/lib/axiosPhp";

export const authProfessional = async (data) => {
  const login = `/apinovades/generico/obtenerUsuProfesional.php?_i={"_e":"20","_m":"homo","_u":"${data.usuario}","_p":"${data.password}"}`;
  try {
    const response = await apiPhp(login);
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const tableSchedules = async (data) => {
  try {
    const response = await apiPhp(data);
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

// medical history
export default async function getDataMedicalHistory({ dni }: { dni: string }) {
  try {
    const response = await apiPhp(
      `/apinovades/mitramed/obtenerPacienteHC.php?_i={"_e":"20","_m":"homo","_d":${dni}}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos del odontograma: ${error}`);
  }
}
