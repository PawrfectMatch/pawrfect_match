import React, { useState } from "react";
import usePets from "./hooks/usePets";
import useSearchPets from "./hooks/useSearchPets";
import PetGrid from "./components/PetGrid";
import PetFilter from "./components/PetFilter";

function App() {
  const { allPets, loading, error } = usePets();
  const [query, setQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);

  // Search filter πάνω σε όλα τα pets
  const searchFilteredPets = useSearchPets(allPets, query);

  // Όταν αλλάζουν φίλτρα στο PetFilter, ενημερώνεται το filteredPets
  const handleFilterChange = (pets) => {
    setFilteredPets(pets);
  };

  // Τα τελικά pets που θα εμφανίζονται
  const petsToDisplay = filteredPets.length || query ? filteredPets : searchFilteredPets;

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🐾 Our Pets</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Name or ID"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "250px", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      {/* Dropdown filters */}
      <PetFilter allPets={allPets} onFilterChange={handleFilterChange} />

      {/* Grid με τα τελικά pets */}
      <PetGrid pets={petsToDisplay} />
    </div>
  );
}

export default App;
