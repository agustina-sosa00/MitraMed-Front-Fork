import { apiPhp } from "@/lib/axiosPhp";

export const authProfessional = async (data) => {
  const login = `/apinovades/generico/obtenerUsuProfesional.php?_i={"_e":"20","_m":"homo","_u":"${data.dni}","_p":"${data.password}"}`;
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
