import { getAccessTokenDropbox } from "@/services/MedicalHistoryService";
import axios from "axios";
import Cookies from "js-cookie";

export const apiDropbox = axios.create({
  baseURL: "https://content.dropboxapi.com",
});

apiDropbox.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    const tag = error?.response?.data?.error?.[".tag"];
    const isExpiredToken = status === 401 && tag === "expired_access_token";
    if (isExpiredToken) {
      try {
        const refreshToken = Cookies.get("refreshTokenDropbox") || "";
        const app_id = Cookies.get("appIdDropbox") || "";
        const app_secret = Cookies.get("appSecretDropbox") || "";
        const newTokenData = await getAccessTokenDropbox({
          refreshToken: refreshToken,
          clientId: app_id,
          clientSecret: app_secret,
        });
        const newTokenAccessDropbox = newTokenData.access_token;
        Cookies.set("accessTokenDropbox", newTokenAccessDropbox, {
          expires: 5 / 24,
        });

        error.config.headers[
          "Authorization"
        ] = `Bearer ${newTokenAccessDropbox}`;
        return apiDropbox.request(error.config);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
