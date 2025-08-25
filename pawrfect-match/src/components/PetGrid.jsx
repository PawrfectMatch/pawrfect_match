// main
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PetCard from "./PetCard";

const PetGrid = ({ pets, maxWidth = 1000, showRemove = false }) => {
  if (!pets || pets.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No pets found.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mx: "auto", maxWidth }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"   // κεντραρισμένο κάτω από το filter bar
        alignItems="flex-start"
      >
        {pets.map((pet) => (
          <Grid key={pet._id} item xs="auto" sx={{ display: "flex" }}>
            <PetCard pet={pet} showRemove={showRemove} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetGrid;
