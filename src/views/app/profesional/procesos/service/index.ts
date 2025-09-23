import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";
import { mockTurnos } from "../mock/index";

export async function obtenerTurnosDoctoresDia(fecha: string) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerTurnosDoctoresDia.php?_i={"_e":"${empresa}","_m":"${modo}","_f":"${fecha}"}`,
    );

    console.log(response);

    // return response.data;
    return { data: mockTurnos };
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function enviarEmailRecordatorio(fecha: string, body: any) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();
    // El body debe ser solo el array de doctores
    const doctoresArray = Array.isArray(body.datos) ? body.datos : body;
    console.log("Body enviado:", doctoresArray);
    const response = await apiPhp.post(
      `/${entorno}/twilio/enviaEmail.php?_i={"_e":"${empresa}","_m":"${modo}","fecha":"${fecha}"}`,
      doctoresArray,
      { headers: { "Content-Type": "application/json" } },
    );
    console.log(response);
    // return response.data;
    return { data: mockTurnos };
  } catch (error) {
    throw new Error(`${error}`);
  }
}
