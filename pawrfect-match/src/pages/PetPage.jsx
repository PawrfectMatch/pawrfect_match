// src/pages/PetPage.jsx
import React, { useState, useMemo } from "react";
import usePets from "../hooks/usePets";
import useSearchPets from "../hooks/useSearchPets";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import { theme } from "../theme/createTheme";
import { Link as RouterLink } from "react-router-dom";

const PetPage = () => {
  const { allPets, loading, error } = usePets();

  // search query (by name/id)
  const [query, setQuery] = useState("");

  
  
  const [filteredByDropdown, setFilteredByDropdown] = useState(null);

  // if no filters -> allPets
  // if there is a combo of filters -> show content even there is no card
  const basePets = useMemo(
    () => (filteredByDropdown === null ? allPets : filteredByDropdown),
    [filteredByDropdown, allPets]
  );

  const searchedPets = useSearchPets(basePets, query);

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
        {/* Header with button*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <h1 style={{ margin: 0 }}>🐾 Our Pets</h1>
          <Button
            component={RouterLink}
            to="/favorites"
            variant="contained"
            color="secondary"
          >
            Favorites
          </Button>
        </Box>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "260px",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Dropdown filters (default: Available) */}
        <PetFilter allPets={allPets} onFilterChange={setFilteredByDropdown} />

        
        <PetGrid pets={searchedPets} maxWidth={1000} />
      </Box>
    </ThemeProvider>
  );
};

export default PetPage;
