import { apiPhp } from "@/lib/axiosPhp";
import axios, { AxiosError } from "axios";
import { ToothChangeTuple } from "../types/odontogramaTypes";
import { getLocalStorageParams } from "@/utils/index";
interface BackendError {
  message?: string;
  error?: string;
}

export async function getOdontogram({ dni }: { dni: string }) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerOdontograma1.php?_i={"_e":"${empresa}","_m":"${modo}","_d":${dni}}`,
    );
    return response.data;
  } catch (error) {
    let msg = "Error obteniendo datos, pruebe con otro DNI";

    if (axios.isAxiosError<BackendError>(error)) {
      const err = error as AxiosError<BackendError>;
      const st = err.response?.status;
      const stText = err.response?.statusText;

      // 👉 Si el status es 405, forzar mensaje fijo
      if (st === 405) {
        msg = "Error obteniendo datos, pruebe con otro DNI";
      } else {
        const backendMsg = err.response?.data?.message || err.response?.data?.error;
        if (backendMsg) msg = backendMsg;
        else if (st) msg = `${st} ${stText ?? ""}`.trim();
        else if (err.message) msg = err.message;
      }
    }

    throw new Error(msg);
  }
}

export async function postSaveOdontogram({ dni, data }: { dni: string; data: ToothChangeTuple[] }) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp.post(
      `/${entorno}/mitramed/grabarOdontograma.php?_i={"_e":"${empresa}","_m":"${modo}","_d":${dni}}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error guardando datos del odontograma: ${error}`);
  }
}
