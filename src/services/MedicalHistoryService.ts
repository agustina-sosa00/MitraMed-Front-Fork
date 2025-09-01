import { apiPhp } from "@/lib/axiosPhp";
import axios from "axios";
import Cookies from "js-cookie";

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

export async function grabarPacienteDocum({
  empresa,
  idhistoria,
  idopera,
  extension,
  iddoctor,
}: {
  empresa: number;
  idhistoria: number;
  idopera: string;
  extension: string;
  iddoctor: number;
}) {
  try {
    const modo = localStorage.getItem("_m") ?? "";

    const data = {
      _e: empresa,
      _m: modo,
      idhistoria: idhistoria,
      idopera: idopera,
      extension: extension,
      iddoctor: iddoctor,
    };
    const response = await apiPhp.post(
      `/apinovades/mitramed/grabarPacienteDocum.php`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//region dropbox
export const getDataDropbox = async () => {
  const modo = localStorage.getItem("_m") ?? "";

  try {
    const response = await apiPhp(
      `/apinovades/dropbox/obtenerDropboxDatos.php?_i={"_e":"20","_m":"${modo}"}`
    );
    console.log("se ejecuto el getDataDropbox");
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

export const uploadFileDropbox = async ({
  fileNameError,
  file,
  folder,
}: {
  fileNameError: string;
  file: File;
  folder: string;
}) => {
  const fileName = file!.name.split(".")[0];
  const contentDropboxURL = "https://content.dropboxapi.com";
  try {
    const modo = localStorage.getItem("_m") ?? "";

    const accessToken = Cookies.get("accessTokenDropbox");
    const response = await axios.post(
      `${contentDropboxURL}/2/files/upload`,
      file,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": JSON.stringify({
            path: `/${modo}/${folder}/${fileName}`,
            mode: "overwrite",
          }),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Error subiendo el archivo: ${fileNameError}. Error: ${error}`
    );
  }
};

export const downloadFileDropbox = async ({
  folder,
  archivo,
}: {
  folder: string;
  archivo: string;
}) => {
  const accessToken = Cookies.get("accessTokenDropbox");

  try {
    const response = await axios.post(
      `https://content.dropboxapi.com/2/files/download`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
