import { apiPhp } from "@/lib/axiosPhp";

export default async function getOdontogram({ dni }: { dni: string }) {
  try {
    const response = await apiPhp(
      `/apinovades/mitramed/obtenerOdontograma.php?_i={"_e":"20","_m":"homo","_d":${dni}}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos del odontograma: ${error}`);
  }
}
