import { apiPhp } from "@/lib/axiosPhp";
import { ToothChangeTuple } from "../types";

export async function getOdontogram({ dni }: { dni: string }) {
  try {
    const response = await apiPhp(
      `/apinovades/mitramed/obtenerOdontograma1.php?_i={"_e":"20","_m":"homo","_d":${dni}}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos del odontograma: ${error}`);
  }
}

export async function postSaveOdontogram({
  dni,
  data,
}: {
  dni: string;
  data: ToothChangeTuple[];
}) {
  try {
    const response = await apiPhp.post(
      `/apinovades/mitramed/grabarOdontograma.php?_i={"_e":"20","_m":"homo","_d":${dni}}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error guardando datos del odontograma: ${error}`);
  }
}
