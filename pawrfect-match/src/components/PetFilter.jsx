import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";

const PetFilter = ({ allPets = [], onFilterChange }) => {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAdopted, setSelectedAdopted] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");

  // Μοναδικά species για dropdown (με memo για performance)
  const speciesOptions = useMemo(() => {
    const set = new Set(allPets.map((p) => p.species).filter(Boolean));
    return Array.from(set).sort();
  }, [allPets]);

  // Εφάρμοσε φίλτρα κάθε φορά που αλλάζουν δεδομένα/επιλογές
  useEffect(() => {
    let filtered = allPets;

    if (selectedSpecies) {
      filtered = filtered.filter((p) => p.species === selectedSpecies);
    }

    if (selectedGender) {
      filtered = filtered.filter((p) => p.gender === selectedGender);
    }

    if (selectedAdopted) {
      const adoptedBool = selectedAdopted === "Adopted";
      filtered = filtered.filter((p) => p.adopted === adoptedBool);
    }

    if (selectedAgeRange) {
      filtered = filtered.filter((p) => {
        const age = Number(p.age) ?? 0;
        switch (selectedAgeRange) {
          case "0-1":
            return age >= 0 && age <= 1;
          case "2-5":
            return age >= 2 && age <= 5;
          case "6+":
            return age >= 6;
          default:
            return true;
        }
      });
    }

    onFilterChange?.(filtered);
  }, [
    allPets,
    selectedSpecies,
    selectedGender,
    selectedAdopted,
    selectedAgeRange,
    onFilterChange,
  ]);

  // Reset όλων των φίλτρων
  const handleReset = () => {
    setSelectedSpecies("");
    setSelectedGender("");
    setSelectedAdopted("");
    setSelectedAgeRange("");
    onFilterChange?.(allPets);
  };

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        useFlexGap
        flexWrap="wrap"
      >
        {/* Species */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="filter-species-label" sx={{ color: "primary.dark" }}>Species</InputLabel>
          <Select
            labelId="filter-species-label"
            label="Species"
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {speciesOptions.map((sp) => (
              <MenuItem key={sp} value={sp}>
                {sp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Gender */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="filter-gender-label" sx={{ color: "primary.dark" }}>Gender</InputLabel>
          <Select
            labelId="filter-gender-label"
            label="Gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>

        {/* Adoption Status */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="filter-status-label" sx={{ color: "primary.dark" }}>Status</InputLabel>
          <Select
            labelId="filter-status-label"
            label="Status"
            value={selectedAdopted}
            onChange={(e) => setSelectedAdopted(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Adopted">Adopted</MenuItem>
          </Select>
        </FormControl>

        {/* Age range */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="filter-age-label" >Age</InputLabel>
          <Select
            labelId="filter-age-label"
            label="Age"
            value={selectedAgeRange}
            onChange={(e) => setSelectedAgeRange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0-1">0–1</MenuItem>
            <MenuItem value="2-5">2–5</MenuItem>
            <MenuItem value="6+">6+</MenuItem>
          </Select>
        </FormControl>

        <Divider
          flexItem
          orientation="vertical"
          sx={{ display: { xs: "none", sm: "block" } }}
        />

        <Button
          onClick={handleReset}
          variant="outlined"
          color="info"
          sx={{ ml: { sm: "auto" } }}
        >
          Reset filters
        </Button>
      </Stack>
    </Box>
  );
};

export default PetFilter;
