import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PetCard from "./PetCard";

const PetGrid = ({ pets, maxWidth = 1000 }) => { // ✅ ταιριάζει με PetPage
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
        justifyContent="center"   // ✅ κεντράρει τις στήλες οριζόντια
        alignItems="flex-start"
      >
        {pets.map((pet) => (
          <Grid
            key={pet._id}
            item
            xs="auto"                // κάθε item όσο η κάρτα
            sx={{ display: "flex" }}
          >
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetGrid;
