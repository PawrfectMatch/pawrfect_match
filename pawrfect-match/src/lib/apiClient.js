// src/lib/apiClient.js
import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./auth";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let pending = [];

function onRefreshed(newToken) {
  pending.forEach((cb) => cb(newToken));
  pending = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    const status = error?.response?.status;

    if (status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pending.push((newToken) => {
          if (!newToken) return reject(error);
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(original));
        });
      });
    }

    isRefreshing = true;
    try {
      const { data } = await axios.post(
        `${baseURL}/api/auth/refresh-token`,
        {},
        { withCredentials: true }
      );
      const newToken = data?.accessToken;
      if (!newToken) throw new Error("No access token");
      setAccessToken(newToken);
      onRefreshed(newToken);

      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (e) {
      clearAccessToken();
      onRefreshed(null);
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
