import React, { useState } from "react";
import usePets from "./hooks/usePets";
import useSearchPets from "./hooks/useSearchPets";
import PetGrid from "./components/PetGrid";

function App() {
  const { allPets, loading, error } = usePets();
  const [query, setQuery] = useState("");
  const filteredPets = useSearchPets(allPets, query);

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
        style={{ padding: "0.5rem", width: "250px", marginBottom: "2rem", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      {/* Grid με φιλτραρισμένα pets */}
      <PetGrid pets={filteredPets} />
    </div>
  );
}

export default App;
