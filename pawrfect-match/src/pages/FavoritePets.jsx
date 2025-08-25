import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/createTheme";
import { useFavorites } from "../context/FavoritesContext.jsx";
import PetGrid from "../components/PetGrid";
import { Link as RouterLink } from "react-router-dom";

export default function FavoritePets() {
  const { favorites } = useFavorites();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
        {/* Header με κουμπί πάνω δεξιά */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
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
            Back to Search
          </Button>
        </Box>

        {!favorites || favorites.length === 0 ? (
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
