// main
import React, { useEffect } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/createTheme";
import { useFavorites } from "../context/FavoritesContext.jsx";
import PetGrid from "../components/PetGrid";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function FavoritePets() {
  const { favorites, loadFavorites } = useFavorites();

  
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const navigate=useNavigate()

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
          <Box sx={{display: "flex", gap: 2}}>

          <Button
            component={RouterLink}
            to="/pets"
            variant="contained"
            color="secondary"
          >
            BACK TO SEARCH
          </Button>
            <Avatar
              sx={{ cursor: "pointer" }}
              alt="User profile image"
              aria-label="Go to user profile"
              onClick={() => navigate("/profile")}
            />
          </Box>
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
