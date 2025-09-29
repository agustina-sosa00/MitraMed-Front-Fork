import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";
// import { mockTurnos } from "../mock/index";

export async function obtenerTurnosDoctoresDia(fecha: string) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerTurnosDoctoresDia.php?_i={"_e":"${empresa}","_m":"${modo}","_f":"${fecha}"}`;
    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function obtenerDoctoresDatosEmail(fecha: string) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/mitramed/obtenerProcesosMov.php?_i={"_e":"${empresa}","_m":"${modo}","_f":"${fecha}"}`;

    const response = await apiPhp(url);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function enviarEmailRecordatorio(fecha: string, body: any) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const url = `/${entorno}/twilio/enviaEmail.php?_i={"_e":"${empresa}","_m":"${modo}","fecha":"${fecha}"}`;

    // console.log(url);
    const prueba = [body[1]];
    const response = await apiPhp.post(url, prueba);

    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function grabarProcesoService({
  fecha,
  tproceso,
  idProfesional,
}: {
  fecha: any;
  tproceso: any;
  idProfesional: any;
}) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const payload = {
      _e: empresa,
      _m: modo,
      _u: idProfesional,
      _f: fecha,
      _t: tproceso,
    };

    const url = `/${entorno}/mitramed/grabarProceso.php`;

    const response = await apiPhp.post(url, payload);

    return response;
  } catch (error: any) {
    throw new Error(`${error}`);
  }
}
