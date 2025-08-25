import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (petId) => favorites.some((p) => p._id === petId);

  const toggleFavorite = (pet) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p._id === pet._id);
      if (exists) return prev.filter((p) => p._id !== pet._id);
      // κρατάμε snapshot του pet αυτή τη στιγμή
      return [{ ...pet }, ...prev];
    });
  };

  // μικρό helper για να ενημερώνουμε ένα pet μέσα στα favorites (π.χ. adopted)
  const updateFavorite = (petId, patch) => {
    setFavorites((prev) =>
      prev.map((p) => (p._id === petId ? { ...p, ...patch } : p))
    );
  };

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, updateFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
