import React from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/createTheme";
import { useFavorites } from "../context/FavoritesContext.jsx";
import PetGrid from "../components/PetGrid";

export default function FavoritePets() {
  const { favorites } = useFavorites();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          ❤️ Your Favorite Pets
        </Typography>
        {(!favorites || favorites.length === 0) ? (
          <Typography variant="body1" color="text.secondary">
            No favorites yet. Tap the heart on a pet to add it here.
          </Typography>
        ) : (
          <PetGrid pets={favorites} />
        )}
      </Box>
    </ThemeProvider>
  );
}
