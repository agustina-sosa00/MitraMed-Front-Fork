import { apiPhp } from "@/lib/axiosPhp";

export const getDataDropbox = async () => {
  try {
    const response = await apiPhp(
      `/apinovades/dropbox/obtenerDropboxDatos.php?_i={"_e":"000020","_ta":"1","_tf":"hc"}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getTokenDropbox = async ({
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
    const response = await apiPhp.post(
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
  token,
  folder,
}: {
  fileNameError: string;
  file: File;
  token: string;
  folder: string;
}) => {
  const dropboxURL = "https://content.dropboxapi.com";
  try {
    const response = await apiPhp.post(`${dropboxURL}/2/files/upload`, file, {
      headers: {
        Authorization: `Bearer ${token}`,
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
