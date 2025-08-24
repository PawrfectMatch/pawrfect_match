// src/pages/PetPage.jsx
import React, { useState } from "react";
import usePets from "../hooks/usePets";
import useSearchPets from "../hooks/useSearchPets";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";
import { ThemeProvider, CssBaseline, Container} from "@mui/material";
import { theme } from "../theme/createTheme"

const PetPage = () => {
  const { allPets, loading, error } = usePets();

  // search query (by name/id)
  const [query, setQuery] = useState("");

  // αποτελέσματα μετά το search
  const searchFilteredPets = useSearchPets(allPets, query);

  // αποτελέσματα μετά τα dropdown φίλτρα (έρχονται από το PetFilter)
  const [filteredByDropdown, setFilteredByDropdown] = useState([]);

  // τελικό dataset για εμφάνιση:
  // αν υπάρχουν ενεργά dropdown φίλτρα, δείχνουμε αυτά,
  // αλλιώς δείχνουμε τα αποτελέσματα του search (ή όλα αν query="")
  const petsToDisplay =
    filteredByDropdown.length || query ? filteredByDropdown : searchFilteredPets;

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🐾 Our Pets</h1>

      {/* Search bar */}
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

      {/* Dropdown filters (species, gender, status, age) */}
      <PetFilter allPets={allPets} onFilterChange={setFilteredByDropdown} />

      {/* Grid με τελικά pets */}
      
      <PetGrid pets={petsToDisplay}/>
      
    </div>
    
    </ThemeProvider>
  );
};

export default PetPage;
