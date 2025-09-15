// src/interceptors/axios.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_DOMAIN_URL_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

api.interceptors.request.use(
  (request) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("https://api.crushererp.com/api/Account/RefreshToken",
          {
            refresh_token: refreshToken,
            grant_type: "refresh_token",
          }
        );
        console.log(`${BASE_URL}/Account/RefreshToken)+" Hello`);
        sessionStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.access_token}`;

        return api(error.config);
      } catch (refreshError) {
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
