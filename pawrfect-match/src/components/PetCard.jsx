// main
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Collapse,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LaunchIcon from "@mui/icons-material/Launch";
import InfoIcon from "@mui/icons-material/Info";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PetDetails from "./PetDetails";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pet, showRemove = false }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, removeFavorite } = useFavorites();

  const favoriteNow = isFavorite(pet._id);
  const isAdopted = !!pet.adopted;

  const fallback =
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop";

  const heartTooltip = isAdopted
    ? favoriteNow
      ? "Favorited (adopted)"
      : "Can't favorite adopted pets"
    : favoriteNow
    ? "Remove from favorites"
    : "Add to favorites";

  return (
    <Card
      sx={{
        width: 380, // σταθερό πλάτος κάρτας
        boxSizing: "border-box",
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
          <Stack direction="row" spacing={0.5}>
            {/* Favorite (disabled όταν adopted) */}
            <Tooltip title={heartTooltip}>
              <span>
                <IconButton
                  aria-label={favoriteNow ? "unfavorite" : "favorite"}
                  onClick={() => toggleFavorite(pet)}
                  sx={{ color: "error.main" }}
                  disabled={isAdopted}
                >
                  {favoriteNow ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </span>
            </Tooltip>

            {/* View Details */}
            <Tooltip title={open ? "Hide Details" : "View Details"}>
              <IconButton
                color="primary"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>

            {/* Adopt */}
            <Tooltip title={isAdopted ? "Already adopted" : "Start adoption"}>
              <span>
                <IconButton
                  color="secondary"
                  disabled={isAdopted}
                  onClick={() =>
                    navigate(`/adopt/${pet._id}`, { state: { pet } })
                  }
                >
                  <LaunchIcon />
                </IconButton>
              </span>
            </Tooltip>

            {/* Remove μόνο στο /favorites */}
            {showRemove && (
              <Tooltip title="Remove from favorites">
                <IconButton color="error" onClick={() => removeFavorite(pet._id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
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
            label={isAdopted ? "Adopted" : "Available"}
            size="small"
            color={isAdopted ? "warning" : "success"}
            variant={isAdopted ? "outlined" : "filled"}
          />
        </Stack>
      </CardContent>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ px: 2, pb: 2 }}>
          <PetDetails pet={pet} />
        </Box>
      </Collapse>
    </Card>
  );
};

export default PetCard;
