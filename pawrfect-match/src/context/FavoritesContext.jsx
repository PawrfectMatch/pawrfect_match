// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import api from "../lib/apiClient";
import { ensureValidAccessToken } from "../lib/auth";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const ok = await ensureValidAccessToken();
      if (!ok) {
        setFavorites([]);
        return;
      }
      const { data } = await api.get("/api/users/me/favorites");
      setFavorites(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.msg || "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   loadFavorites();
  // }, [loadFavorites]);

  useEffect(() => {
  const handleStorage = (e) => {
    if (e.key === "accessToken" && e.newValue) {
      loadFavorites();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, [loadFavorites]);

  const isFavorite = useCallback((id) => favorites.some((p) => p._id === id), [favorites]);

  const toggleFavorite = useCallback(async (pet) => {
    if (!pet) return false;
    try {
      const ok = await ensureValidAccessToken();
      if (!ok) return false;

      if (favorites.some((p) => p._id === pet._id)) {
        const { data } = await api.delete(`/api/users/me/favorites/${pet._id}`);
        setFavorites(Array.isArray(data) ? data : []);
      } else {
        if (pet.adopted) return false;
        const { data } = await api.post(`/api/users/me/favorites/${pet._id}`);
        setFavorites(Array.isArray(data) ? data : []);
      }
      return true;
    } catch (e) {
      setError(e?.response?.data?.msg || "Failed to update favorites");
      return false;
    }
  }, [favorites]);

  const removeFavorite = useCallback(async (id) => {
    try {
      const ok = await ensureValidAccessToken();
      if (!ok) return false;

      const { data } = await api.delete(`/api/users/me/favorites/${id}`);
      setFavorites(Array.isArray(data) ? data : []);
      return true;
    } catch (e) {
      setError(e?.response?.data?.msg || "Failed to remove favorite");
      return false;
    }
  }, []);

  const updateFavorite = useCallback((id, patch) => {
    setFavorites((prev) => prev.map((p) => (p._id === id ? { ...p, ...patch } : p)));
  }, []);

  const value = useMemo(
    () => ({ favorites, loading, error, isFavorite, toggleFavorite, removeFavorite, updateFavorite, loadFavorites }),
    [favorites, loading, error, isFavorite, toggleFavorite, removeFavorite, updateFavorite, loadFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => useContext(FavoritesContext);
