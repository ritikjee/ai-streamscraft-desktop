import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
});

export default httpClient;
