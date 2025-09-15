import axios from "axios";

const BASE_URL = import.meta.env.VITE_DOMAIN_URL_KEY;
// alert( BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance; 
