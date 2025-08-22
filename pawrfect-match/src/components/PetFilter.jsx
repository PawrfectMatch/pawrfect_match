import React, { useState, useEffect } from "react";

const PetFilter = ({ allPets, onFilterChange }) => {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAdopted, setSelectedAdopted] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");

  // Ουσιαστικά φίλτρα
  useEffect(() => {
    let filtered = allPets;

    // Species filter
    if (selectedSpecies) {
      filtered = filtered.filter(p => p.species === selectedSpecies);
    }

    // Gender filter
    if (selectedGender) {
      filtered = filtered.filter(p => p.gender === selectedGender);
    }

    // Adoption Status filter
    if (selectedAdopted) {
      const adoptedBool = selectedAdopted === "Adopted";
      filtered = filtered.filter(p => p.adopted === adoptedBool);
    }

    // Age Range filter
    if (selectedAgeRange) {
      filtered = filtered.filter(p => {
        const age = p.age;
        switch (selectedAgeRange) {
          case "0-1": return age >= 0 && age <= 1;
          case "2-5": return age >= 2 && age <= 5;
          case "6+": return age >= 6;
          default: return true;
        }
      });
    }

    // Ενημέρωση App με τα φιλτραρισμένα pets
    onFilterChange(filtered);

  }, [allPets, selectedSpecies, selectedGender, selectedAdopted, selectedAgeRange, onFilterChange]);

  // Όλα τα species για το dropdown
  const speciesOptions = [...new Set(allPets.map(pet => pet.species))];

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      {/* Species */}
      <div>
        <label>Species: </label>
        <select value={selectedSpecies} onChange={e => setSelectedSpecies(e.target.value)}>
          <option value="">All</option>
          {speciesOptions.map(species => (
            <option key={species} value={species}>{species}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <label>Gender: </label>
        <select value={selectedGender} onChange={e => setSelectedGender(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Adoption Status */}
      <div>
        <label>Status: </label>
        <select value={selectedAdopted} onChange={e => setSelectedAdopted(e.target.value)}>
          <option value="">All</option>
          <option value="Adopted">Adopted</option>
          <option value="Available">Available</option>
        </select>
      </div>

      {/* Age Range */}
      <div>
        <label>Age: </label>
        <select value={selectedAgeRange} onChange={e => setSelectedAgeRange(e.target.value)}>
          <option value="">All</option>
          <option value="0-1">0-1</option>
          <option value="2-5">2-5</option>
          <option value="6+">6+</option>
        </select>
      </div>
    </div>
  );
};

export default PetFilter;
