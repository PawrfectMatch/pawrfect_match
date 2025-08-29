// src/lib/apiClient.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Πάντα παίρνουμε το πιο φρέσκο token
const getToken = () => localStorage.getItem("accessToken");

const api = axios.create({
  baseURL,
  withCredentials: false, // συνήθη calls χωρίς cookies
});

// Authorization header σε κάθε request (αν υπάρχει token)
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----- Refresh flow (401/403) -----
let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config || {};
    const status = error?.response?.status;

    if ((status === 401 || status === 403) && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        // Κλήση refresh ΜΕ cookies
        const refresh = await axios.post(
          `${baseURL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const newToken = refresh?.data?.accessToken;
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          api.defaults.headers.Authorization = `Bearer ${newToken}`;
          original.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return api(original);
        }
        processQueue(new Error("No access token received from refresh"));
      } catch (err) {
        processQueue(err);
        localStorage.removeItem("accessToken");
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
