// main
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function getAccessToken() {
  return localStorage.getItem("accessToken") || "";
}

export function setAccessToken(token) {
  if (token) localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export function isTokenExpired(token) {
  try {
    const [, payloadB64] = token.split(".");
    if (!payloadB64) return true;
    const payload = JSON.parse(atob(payloadB64));
    const expMs = (payload.exp || 0) * 1000;
    return Date.now() >= expMs - 3000; // 3s margin
  } catch {
    return true;
  }
}

export async function ensureValidAccessToken() {
  const token = getAccessToken();
  if (token && !isTokenExpired(token)) return true;

  try {
    const { data } = await axios.post(
      `${API_BASE}/api/auth/refresh-token`,
      {},
      { withCredentials: true }
    );
    if (data?.accessToken) {
      setAccessToken(data.accessToken);
      return true;
    }
  } catch {
    // ignore
  }
  clearAccessToken();
  return false;
}
