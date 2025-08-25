// main
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // φορτώνει από localStorage στο πρώτο render
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // αποθήκευση σε localStorage σε κάθε αλλαγή
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      // ignore quota errors
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some((p) => p._id === id);

  // δεν επιτρέπουμε add/remove για adopted (UI history mode)
  const toggleFavorite = (pet) => {
    if (!pet) return;
    if (pet.adopted) return;

    setFavorites((prev) => {
      const exists = prev.some((p) => p._id === pet._id);
      if (exists) return prev.filter((p) => p._id !== pet._id);
      return [{ ...pet }, ...prev];
    });
  };

  // αφαίρεση ανεξάρτητα από adopted (χρησιμοποιείται στο /favorites)
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p._id !== id));
  };

  // helper αν θες να ενημερώνεις snapshot (π.χ. adopted:true μετά από φόρμα)
  const updateFavorite = (id, patch) => {
    setFavorites((prev) => prev.map((p) => (p._id === id ? { ...p, ...patch } : p)));
  };

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite, updateFavorite }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => useContext(FavoritesContext);
