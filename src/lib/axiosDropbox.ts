import axios from "axios";

export const apiDropbox = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
