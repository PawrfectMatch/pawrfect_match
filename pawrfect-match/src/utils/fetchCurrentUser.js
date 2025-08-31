
import axios from "axios";
import { getAccessToken } from "../lib/auth";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default async function fetchCurrentUser() {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const { data } = await axios.get(`${baseURL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return data;
  } catch {
    return null;
  }
}
