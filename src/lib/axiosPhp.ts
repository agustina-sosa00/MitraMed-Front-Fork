import axios from "axios";

export const apiPhp = axios.create({
  baseURL: import.meta.env.VITE_API_PHPURL,
});
