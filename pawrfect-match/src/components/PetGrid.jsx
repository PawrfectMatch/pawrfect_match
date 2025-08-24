import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PetCard from "./PetCard";

const PetGrid = ({ pets, maxWidth = 900 }) => {
  if (!pets || pets.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        No pets found.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mx: "auto", maxWidth }}>
      <Grid container spacing={2} justifyContent="center">
        {pets.map((pet) => (
          <Grid key={pet._id} item xs={12} sm={6} md={4} lg={3}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetGrid;
