import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";

type grabarHistoriaParams = {
  idpaciente: number;
  fecha: string;
  detalle: string;
  obs: string;
  idhistoria?: number | null;
  tproceso?: number | null;
  iddoctor: string;
  idopera?: string | null;
  extension?: string | null;
};

export async function obtenerPacienteHc(dni: string) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerPacienteHC.php?_i={"_e":"${empresa}","_m":"${modo}","_d":${dni}}`,
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos del HC: ${error}`);
  }
}

export function grabarHistoria({
  idpaciente,
  fecha,
  detalle,
  obs,
  iddoctor,
  idhistoria,
  tproceso,
  idopera = null,
  extension = null,
}: grabarHistoriaParams) {
  const { empresa, modo, entorno } = getLocalStorageParams();

  const data = {
    _e: empresa,
    _m: modo,
    idpaciente,
    fecha,
    detalle,
    obs,
    idhistoria: idhistoria ?? null,
    tproceso: tproceso ?? null,
    iddoctor,
    idopera: idopera ?? null,
    extension: extension ?? null,
  };

  console.log(data);

  try {
    const url = `/${entorno}/mitramed/grabarHistoria.php`;

    const response = apiPhp.post(url, data);
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function grabarHistoriaDocum({
  idhistoria,
  idopera,
  extension,
}: {
  idhistoria: number;
  idopera: string;
  extension: string;
}) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const data = {
      _e: empresa,
      _m: modo,
      idhistoria: idhistoria,
      idopera: idopera,
      extension: extension,
    };

    const response = await apiPhp.post(`/${entorno}/mitramed/grabarHistoriaDocum.php`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getIdOpera({ dni, idhistoria }: { dni: number; idhistoria: number }) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerIdOpera.php?_i={"_e":"${empresa}","_m":"${modo}","_d":"${dni}","_ih":"${idhistoria}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

//region dropbox
export const getDataDropbox = async () => {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    const response = await apiPhp(
      `/${entorno}/dropbox/obtenerDropboxDatos.php?_i={"_e":"${empresa}","_m":"${modo}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const grabarArchivoDropbox = async ({
  fileOriginalName,
  file,
}: {
  fileOriginalName: string;
  file: File;
}) => {
  const { empresa, modo, entorno } = getLocalStorageParams();

  const formData = new FormData();
  formData.append("_e", empresa!);
  formData.append("_m", modo!);
  formData.append("archivo", file);

  try {
    const url = `/${entorno}/dropbox/subirArchivoDropbox.php`;
    const response = await apiPhp.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error subiendo el archivo: ${fileOriginalName}. Error: ${error}`);
  }
};

export const descargarArchivoDropbox = async ({
  idopera,
  extension,
}: {
  idopera: string;
  extension: string;
}) => {
  const { empresa, modo, entorno } = getLocalStorageParams();

  const body = {
    empresa,
    modo,
    idopera,
    extension,
  };

  try {
    const response = await apiPhp.post(`/${entorno}/dropbox/descargarArchivoDropbox.php`, body, {
      responseType: "blob",
    });

    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error al descargar un archivo de Dropbox: ${error}`);
  }
};
