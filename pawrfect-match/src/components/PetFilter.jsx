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
  // ✅ Default: display only  "Available"
  const [selectedAdopted, setSelectedAdopted] = useState("Available");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");

  // unique species dropdown (with memo for performance)
  const speciesOptions = useMemo(() => {
    const set = new Set(allPets.map((p) => p.species).filter(Boolean));
    return Array.from(set).sort();
  }, [allPets]);

  // set filters each time there is a change
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
        const ageNum = Number.isFinite(Number(p.age)) ? Number(p.age) : 0;
        switch (selectedAgeRange) {
          case "0-1":
            return ageNum >= 0 && ageNum <= 1;
          case "2-5":
            return ageNum >= 2 && ageNum <= 5;
          case "6+":
            return ageNum >= 6;
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

  // Reset filters to "Available"
  const handleReset = () => {
    setSelectedSpecies("");
    setSelectedGender("");
    setSelectedAdopted("Available"); // ✅ default
    setSelectedAgeRange("");
    
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
          <InputLabel id="filter-species-label" sx={{ color: "primary.dark" }}>
            Species
          </InputLabel>
          <Select
            labelId="filter-species-label"
            label="Species"
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
          >
            <MenuItem value="" sx={{ color: "primary.dark" }}>
              All
            </MenuItem>
            {speciesOptions.map((sp) => (
              <MenuItem key={sp} value={sp} sx={{ color: "primary.dark" }}>
                {sp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Gender */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="filter-gender-label" sx={{ color: "primary.dark" }}>
            Gender
          </InputLabel>
          <Select
            labelId="filter-gender-label"
            label="Gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <MenuItem value="" sx={{ color: "primary.dark" }}>
              All
            </MenuItem>
            <MenuItem value="Male" sx={{ color: "primary.dark" }}>
              Male
            </MenuItem>
            <MenuItem value="Female" sx={{ color: "primary.dark" }}>
              Female
            </MenuItem>
          </Select>
        </FormControl>

        {/* Adoption Status */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="filter-status-label" sx={{ color: "primary.dark" }}>
            Status
          </InputLabel>
          <Select
            labelId="filter-status-label"
            label="Status"
            value={selectedAdopted}
            onChange={(e) => setSelectedAdopted(e.target.value)}
            sx={{ "& .MuiSelect-select": { color: "primary.dark" } }}
          >
            {/* "" = All */}
            <MenuItem value="" sx={{ color: "primary.dark" }}>
              All
            </MenuItem>
            <MenuItem value="Available" sx={{ color: "primary.dark" }}>
              Available
            </MenuItem>
            <MenuItem value="Adopted" sx={{ color: "primary.dark" }}>
              Adopted
            </MenuItem>
          </Select>
        </FormControl>

        {/* Age range */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="filter-age-label" sx={{ color: "primary.dark" }}>
            Age
          </InputLabel>
          <Select
            labelId="filter-age-label"
            label="Age"
            value={selectedAgeRange}
            onChange={(e) => setSelectedAgeRange(e.target.value)}
          >
            <MenuItem value="" sx={{ color: "primary.dark" }}>
              All
            </MenuItem>
            <MenuItem value="0-1" sx={{ color: "primary.dark" }}>
              0–1
            </MenuItem>
            <MenuItem value="2-5" sx={{ color: "primary.dark" }}>
              2–5
            </MenuItem>
            <MenuItem value="6+" sx={{ color: "primary.dark" }}>
              6+
            </MenuItem>
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
