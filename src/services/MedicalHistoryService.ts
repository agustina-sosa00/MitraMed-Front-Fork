import { apiPhp } from "@/lib/axiosPhp";
import axios from "axios";

export function postSaveHistory({
  dni,
  fecha,
  detalle,
  obs,
  iddoctor,
  _e,
}: {
  dni: number;
  fecha: string;
  detalle: string;
  obs: string;
  iddoctor: string;
  _e: number;
}) {
  const modo = localStorage.getItem("_m") ?? "";
  const data = {
    _e: _e,
    _m: modo,
    dni: dni,
    fecha: fecha,
    detalle: detalle,
    obs: obs,
    iddoctor: iddoctor,
  };
  try {
    const response = apiPhp.post(
      `/apinovades/mitramed/grabarHistoria.php`,
      data
    );
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

//region dropbox
export const getDataDropbox = async () => {
  const modo = localStorage.getItem("_m") ?? "";

  try {
    const response = await apiPhp(
      `/apinovades/dropbox/obtenerDropboxDatos.php?_i={"_e":"20","_m":"${modo}"}`
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
    const response = await axios.post(
      `${dropboxURL}/oauth2/token`,
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener token de Dropbox: ", error);
  }
};

const dropboxURL = "https://content.dropboxapi.com";

export const uploadFileDropbox = async ({
  fileNameError,
  file,

  folder,
}: {
  fileNameError: string;
  file: File;

  folder: string;
}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(`${dropboxURL}/2/files/upload`, file, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": JSON.stringify({
          path: `/${folder}/${file.name}`,
          mode: "overwrite",
        }),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Error subiendo el archivo: ${fileNameError}. Error: ${error}`
    );
  }
};

export const downloadFileDropbox = async ({
  token,
  folder,
  archivo,
}: {
  token: string;
  folder: string;
  archivo: string;
}) => {
  try {
    const response = await axios.post(
      `https://content.dropboxapi.com/2/files/download`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Dropbox-API-Arg": JSON.stringify({
            path: `/${folder}/${archivo}`,
          }),
          "Content-Type": "",
        },
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al descargar un archivo de Dropbox: ${error}`);
  }
};
