// src/context/FavoritesContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import api from "../lib/apiClient";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasToken = () => !!localStorage.getItem("accessToken");

  // Φόρτωση favorites από server (σταθεροποιημένο με useCallback)
  const loadFavorites = useCallback(async () => {
    if (!hasToken()) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/api/users/me/favorites");
      setFavorites(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.msg || "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  // Αρχικό load
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((p) => p._id === id),
    [favorites]
  );

  // Add/Remove μέσω backend — επιστρέφει ενημερωμένη λίστα
  const toggleFavorite = useCallback(
    async (pet) => {
      if (!pet) return false;
      if (!hasToken()) return false;

      try {
        if (favorites.some((p) => p._id === pet._id)) {
          const { data } = await api.delete(
            `/api/users/me/favorites/${pet._id}`
          );
          setFavorites(Array.isArray(data) ? data : []);
        } else {
          if (pet.adopted) return false;
          const { data } = await api.post(
            `/api/users/me/favorites/${pet._id}`
          );
          setFavorites(Array.isArray(data) ? data : []);
        }
        return true;
      } catch (e) {
        setError(e?.response?.data?.msg || "Failed to update favorites");
        return false;
      }
    },
    [favorites]
  );

  const removeFavorite = useCallback(async (id) => {
    if (!hasToken()) return false;
    try {
      const { data } = await api.delete(`/api/users/me/favorites/${id}`);
      setFavorites(Array.isArray(data) ? data : []);
      return true;
    } catch (e) {
      setError(e?.response?.data?.msg || "Failed to remove favorite");
      return false;
    }
  }, []);

  // Local helper (αν χρειαστεί να ενημερώσεις πεδία ενός favorite)
  const updateFavorite = useCallback((id, patch) => {
    setFavorites((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...patch } : p))
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      loading,
      error,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      updateFavorite,
      loadFavorites,
    }),
    [
      favorites,
      loading,
      error,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      updateFavorite,
      loadFavorites,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
