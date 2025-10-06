import { apiPhp } from "@/lib/axiosPhp";

const entornoStorage = localStorage.getItem("_env");
const entorno = entornoStorage === "des" ? "apinovades" : "apinova";
const empresa = localStorage.getItem("_e");
const modo = localStorage.getItem("_m");
export async function obtenerPaciente({ dni }) {
  console.log("entorno", entorno);
  console.log("empresa", empresa);
  console.log("modo", modo);
  try {
    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerPaciente.php?_i={"_e":"${empresa}","_m":"${modo}","_d":"${dni}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
