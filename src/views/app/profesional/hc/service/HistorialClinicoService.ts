import { apiDropbox } from "@/lib/axiosDropbox";
import { apiPhp } from "@/lib/axiosPhp";
import { getLocalStorageParams } from "@/utils/index";
import axios from "axios";
import Cookies from "js-cookie";

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

  try {
    const url = `/${entorno}/mitramed/grabarHistoria.php`;

    const response = apiPhp.post(url, data);
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// export function grabarHistoria({
//   idpaciente,
//   fecha,
//   detalle,
//   obs,
//   iddoctor,
// }: {
//   idpaciente: number;
//   fecha: string;
//   detalle: string;
//   obs: string;
//   iddoctor: string;
// }) {
//   const { empresa, modo, entorno } = getLocalStorageParams();

//   const data = {
//     _e: empresa,
//     _m: modo,
//     idpaciente: idpaciente,
//     fecha: fecha,
//     detalle: detalle,
//     obs: obs,
//     iddoctor: iddoctor,
//   };

//   try {
//     const response = apiPhp.post(`/${entorno}/mitramed/grabarHistoria.php`, data);
//     return response;
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// }

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

export async function obtenerPacienteHc({ dni }: { dni: string }) {
  try {
    const { empresa, modo, entorno } = getLocalStorageParams();

    // console.log("obtenerPacienteHc dni:", dni);

    const response = await apiPhp(
      `/${entorno}/mitramed/obtenerPacienteHC.php?_i={"_e":"${empresa}","_m":"${modo}","_d":${dni}}`,
    );

    // console.log("obtenerPacienteHc response:", response);

    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos del HC: ${error}`);
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

export const getAccessTokenDropbox = async ({
  refreshToken,
  clientId,
  clientSecret,
}: {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
}) => {
  const dropboxURL = "https://api.dropbox.com";
  try {
    const data = new URLSearchParams();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", refreshToken);
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    const response = await axios.post(`${dropboxURL}/oauth2/token`, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener token de Dropbox: ", error);
  }
};

export const uploadFileDropbox = async ({
  fileOriginalName,
  file,
}: {
  fileOriginalName: string;
  file: File;
}) => {
  const folder = localStorage.getItem("mtm-folder");
  try {
    const modo = localStorage.getItem("_m");
    const accessToken = Cookies.get("accessTokenDropbox");

    const response = await apiDropbox.post(`/2/files/upload`, file, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": JSON.stringify({
          path: `/${modo}/${folder}/${file.name}`,
          mode: "add",
          autorename: true,
        }),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error subiendo el archivo: ${fileOriginalName}. Error: ${error}`);
  }
};

export const downloadFileDropbox = async ({ archivo }: { archivo: string }) => {
  const folder = localStorage.getItem("mtm-folder");

  const accessToken = Cookies.get("accessTokenDropbox");
  try {
    const modo = localStorage.getItem("_m");
    const response = await apiDropbox.post(`/2/files/download`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Dropbox-API-Arg": JSON.stringify({
          path: `/${modo}/${folder}/${archivo}`,
        }),
        "Content-Type": "application/octet-stream",
      },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al descargar un archivo de Dropbox: ${error}`);
  }
};
