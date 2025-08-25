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

  // 🔒 Μπλοκάρουμε αλλαγές για adopted pets (ούτε add, ούτε remove)
  const toggleFavorite = (pet) => {
    if (!pet) return;
    if (pet.adopted) return; // history mode: δεν αλλάζουμε το state

    setFavorites((prev) => {
      const exists = prev.some((p) => p._id === pet._id);
      if (exists) return prev.filter((p) => p._id !== pet._id);
      return [{ ...pet }, ...prev];
    });
  };

  // helper για ενημέρωση snapshot (π.χ. όταν γίνει adopted από φόρμα)
  const updateFavorite = (petId, patch) => {
    setFavorites((prev) => prev.map((p) => (p._id === petId ? { ...p, ...patch } : p)));
  };

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, updateFavorite }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => useContext(FavoritesContext);
