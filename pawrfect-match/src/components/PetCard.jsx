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
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LaunchIcon from "@mui/icons-material/Launch";
import PetDetails from "./PetDetails";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pet }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const fallback =
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop";

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
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
        action={
          <Tooltip
            title={
              isFavorite(pet._id) ? "Remove from favorites" : "Add to favorites"
            }
          >
            <IconButton
              aria-label={isFavorite(pet._id) ? "unfavorite" : "favorite"}
              onClick={() => toggleFavorite(pet)}
              sx={{ color: "error.main" }}
            >
              {isFavorite(pet._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        }
      />
      <CardMedia
        component="img"
        sx={{ height: 160, objectFit: "cover" }}
        image={pet.image_url || fallback}
        alt={pet.name}
        loading="lazy"
        onError={(e) => (e.currentTarget.src = fallback)}
      />
      <CardContent>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label={`Age: ${pet.age}`}
            size="small"
            variant="outlined"
            sx={{ color: "primary.dark", borderColor: "primary.dark" }}
          />
          <Chip
            label={pet.gender}
            size="small"
            variant="outlined"
            sx={{ color: "primary.dark", borderColor: "primary.dark" }}
          />
          <Chip
            label={pet.adopted ? "Adopted" : "Available"}
            size="small"
            color={pet.adopted ? "warning" : "success"}
            variant={pet.adopted ? "outlined" : "filled"}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen((v) => !v)}
          fullWidth
          aria-expanded={open}
        >
          {open ? "Hide Details" : "View Details"}
        </Button>

        <Tooltip title={pet.adopted ? "Already adopted" : "Start adoption"}>
          <span style={{ display: "inline-flex", width: "100%" }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<LaunchIcon />}
              disabled={!!pet.adopted}
              onClick={() =>
                navigate(`/adopt/${pet._id}`, {
                  state: { pet }, // περνάμε snapshot για τώρα
                })
              }
            >
              ADOPT
            </Button>
          </span>
        </Tooltip>
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
