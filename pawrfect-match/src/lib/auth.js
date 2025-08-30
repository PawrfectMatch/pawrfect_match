// src/lib/auth.js
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
    // exp είναι σε seconds
    const expMs = (payload.exp || 0) * 1000;
    // δώσε και μικρό περιθώριο 3s
    return Date.now() >= expMs - 3000;
  } catch {
    return true;
  }
}

/*
 * Εξασφαλίζει ότι έχουμε έγκυρο access token.
 */
export async function ensureValidAccessToken() {
  const token = getAccessToken();
  if (token && !isTokenExpired(token)) return true;

  // προσπάθησε refresh με cookie
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
