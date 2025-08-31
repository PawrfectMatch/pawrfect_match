import React, { useState, useMemo } from "react";
import usePets from "../hooks/usePets";
import useSearchPets from "../hooks/useSearchPets";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";
import { ThemeProvider, CssBaseline, Box, Button, Avatar } from "@mui/material";
import { theme } from "../theme/createTheme";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const PetPage = () => {
  const { allPets, loading, error } = usePets();

  // search query (by name/id)
  const [query, setQuery] = useState("");

  // αποτελέσματα μετά τα dropdown φίλτρα (έρχονται από το PetFilter)
  const [filteredByDropdown, setFilteredByDropdown] = useState([]);

  const navigate = useNavigate();

  // ✅ Εφαρμόζουμε ΠΑΝΩ εκεί και το search
  const basePets = useMemo(
    () => (filteredByDropdown.length ? filteredByDropdown : allPets),
    [filteredByDropdown, allPets]
  );
  const searchedPets = useSearchPets(basePets, query);

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

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
            mb: 4,
          }}
        >
          <h1 style={{ margin: 0 }}>🐾 Our Pets</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2
            }}
          >
            <Button
              component={RouterLink}
              to="/favorites"
              variant="contained"
              color="secondary"
            >
              Favorites
            </Button>
            <Avatar
              sx={{ cursor: "pointer" }}
              alt="User profile image"
              aria-label="Go to user profile"
              onClick={() => navigate("/profile")}
            />
          </Box>
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

        {/* Grid με αποτέλεσμα: filters -> search */}
        <PetGrid pets={searchedPets} maxWidth={1000} />
      </Box>
    </ThemeProvider>
  );
};

export default PetPage;
