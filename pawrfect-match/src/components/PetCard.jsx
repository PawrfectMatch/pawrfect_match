import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Chip,
  Button,
  Stack,
  Collapse,
  Box,
} from "@mui/material";
import PetDetails from "./PetDetails";

const PetCard = ({ pet }) => {
  const [open, setOpen] = useState(false);
  const fallback =
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop";

  return (
    <Card
      sx={{
        width: "100%",       // 🔹 γεμίζει τη στήλη
        maxWidth: 360,       // optional upper bound
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: "background.paper",
        color: "primary.dark",
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" noWrap sx={{ color: "primary.dark" }}>
            {pet.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" noWrap sx={{ color: "info.dark" }}>
            {pet.species} {pet.breed ? `• ${pet.breed}` : ""}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        sx={{ height: 160, objectFit: "cover" }}
        image={pet.image_url || fallback}
        alt={pet.name}
        loading="lazy"
      />
      <CardContent>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={`Age: ${pet.age}`} size="small" variant="outlined"
                sx={{ color: "primary.dark", borderColor: "primary.dark" }} />
          <Chip label={pet.gender} size="small" variant="outlined"
                sx={{ color: "primary.dark", borderColor: "primary.dark" }} />
          <Chip label={pet.adopted ? "Adopted" : "Available"} size="small"
                color={pet.adopted ? "warning" : "success"}
                variant={pet.adopted ? "outlined" : "filled"} />
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" color="primary" fullWidth onClick={() => setOpen(v => !v)}>
          {open ? "Hide Details" : "View Details"}
        </Button>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ px: 2, pb: 2 }}>
          <PetDetails pet={pet} />
        </Box>
      </Collapse>
    </Card>
  );
};

export default PetCard;
