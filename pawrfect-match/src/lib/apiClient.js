// src/lib/apiClient.js
import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./auth";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL,
  withCredentials: true, // για refresh-cookie όταν χρειαστεί
});

// Request: βάζουμε Authorization αν υπάρχει token
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

    // Αν δεν είναι 401 ή έχουμε ήδη προσπαθήσει refresh για αυτό το request, απλά πέτα το error
    if (status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // Μαρκάρουμε ότι θα ξαναδοκιμάσουμε αυτό το request
    original._retry = true;

    // Συγχρονισμός πολλαπλών 401
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
      if (!newToken) throw new Error("No access token returned");

      setAccessToken(newToken);
      onRefreshed(newToken);

      // Επανεκτέλεση του original request με νέο token
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
