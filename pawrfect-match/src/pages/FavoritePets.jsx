// src/pages/FavoritePets.jsx
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/createTheme";
import { useFavorites } from "../context/FavoritesContext.jsx";
import PetGrid from "../components/PetGrid";
import { Link as RouterLink } from "react-router-dom";

export default function FavoritePets() {
  const { favorites, loadFavorites } = useFavorites();

  // Φόρτωσε/συγχρόνισε με τον server όταν μπαίνουμε στη σελίδα
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            columnGap: 2,
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ m: 0 }}>
            ❤️ Your Favorite Pets
          </Typography>
          <Button
            component={RouterLink}
            to="/pets"
            variant="contained"
            color="secondary"
          >
            BACK TO SEARCH
          </Button>
        </Box>

        {!favorites || favorites.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No favorites yet. Tap the heart on a pet to add it here.
          </Typography>
        ) : (
          <PetGrid pets={favorites} maxWidth={1000} showRemove />
        )}
      </Box>
    </ThemeProvider>
  );
}
