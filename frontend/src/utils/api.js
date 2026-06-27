import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://scriptaura.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000,
});

console.log("Centralized API URL initialized as:", API_URL);

export default api;
