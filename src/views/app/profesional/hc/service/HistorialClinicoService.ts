import { apiDropbox } from "@/lib/axiosDropbox";
import { apiPhp } from "@/lib/axiosPhp";
import axios from "axios";
import Cookies from "js-cookie";

export function grabarHistoria({
  dni,
  fecha,
  detalle,
  obs,
  iddoctor,
}: {
  dni: number;
  fecha: string;
  detalle: string;
  obs: string;
  iddoctor: string;
}) {
  const modo = localStorage.getItem("_m");
  const empresa = localStorage.getItem("_e");

  const data = {
    _e: empresa,
    _m: modo,
    dni: dni,
    fecha: fecha,
    detalle: detalle,
    obs: obs,
    iddoctor: iddoctor,
  };
  try {
    const response = apiPhp.post(`/apinovades/mitramed/grabarHistoria.php`, data);
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function grabarPacienteDocum({
  idhistoria,
  idopera,
  extension,
  iddoctor,
}: {
  idhistoria: number;
  idopera: string;
  extension: string;
  iddoctor: number;
}) {
  try {
    const modo = localStorage.getItem("_m");
    const empresa = localStorage.getItem("_e");
    const data = {
      _e: empresa,
      _m: modo,
      idhistoria: idhistoria,
      idopera: idopera,
      extension: extension,
      iddoctor: iddoctor,
    };
    const response = await apiPhp.post(`/apinovades/mitramed/grabarPacienteDocum.php`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getIdOpera({ dni, idhistoria }: { dni: number; idhistoria: number }) {
  try {
    const modo = localStorage.getItem("_m");
    const empresa = localStorage.getItem("_e");
    const response = await apiPhp(
      `apinovades/mitramed/obtenerIdOpera.php?_i={"_e":"${empresa}","_m":"${modo}","_d":"${dni}","_ih":"${idhistoria}"}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export default async function obtenerPacienteHc({ dni }: { dni: string }) {
  try {
    const response = await apiPhp(
      `/apinovades/mitramed/obtenerPacienteHc.php?_i={"_e":"20","_m":"homo","_d":${dni}}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos del odontograma: ${error}`);
  }
}

//region dropbox
export const getDataDropbox = async () => {
  const modo = localStorage.getItem("_m");
  const empresa = localStorage.getItem("_e");

  try {
    const response = await apiPhp(
      `/apinovades/dropbox/obtenerDropboxDatos.php?_i={"_e":"${empresa}","_m":"${modo}"}`,
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
