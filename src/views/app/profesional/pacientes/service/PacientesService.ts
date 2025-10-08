import { apiPhp } from "@/lib/axiosPhp";

const entornoStorage = localStorage.getItem("_env");
const entorno = entornoStorage === "des" ? "apinovades" : "apinova";
const empresa = localStorage.getItem("_e");
const modo = localStorage.getItem("_m");
export async function obtenerPaciente({ dni }) {
  try {
    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerPaciente.php?_i={"_e":"${empresa}","_m":"${modo}","_d":"${dni}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function consultaPacientes({
  apellido,
  nombre,
  dni,
  cuil,
  dom1,
  dom2,
  loc,
}: {
  apellido: string;
  nombre: string;
  dni: string;
  cuil: string;
  dom1: string;
  dom2: string;
  loc: string;
}) {
  const data = {
    empresa: empresa,
    modo: modo,
    apellido: apellido,
    nombre: nombre,
    dni: dni,
    cuil: cuil,
    dom1: dom1,
    dom2: dom2,
    loc: loc,
  };
  try {
    const response = await apiPhp.post(`/${entorno}/mitramed/consultaPacientes.php?`, data);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
