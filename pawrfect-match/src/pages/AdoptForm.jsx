import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/createTheme";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function AdoptForm() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateFavorite } = useFavorites();

  // παίρνουμε snapshot pet από το navigate state (δεν κάνουμε fetch για τώρα)
  const pet = location.state?.pet;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  const disabled = useMemo(
    () => !form.fullName || !form.email,
    [form.fullName, form.email]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 ΕΔΩ αργότερα θα βάλουμε το πραγματικό API (PUT /api/pets/:id { adopted:true })
    // Για τώρα: ενημέρωσε το snapshot στα favorites (αν υπάρχει) για συνέπεια στην UI.
    updateFavorite(petId, { adopted: true });

    setSnack({ open: true, msg: "Adoption request submitted! 🎉", severity: "success" });

    // Μικρό delay για να δει ο χρήστης το μήνυμα και γύρνα στη λίστα
    setTimeout(() => navigate("/pets"), 800);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2, maxWidth: 720, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Adopt your new friend
        </Typography>

        {!pet ? (
          <Typography color="warning.main">
            No pet data provided. Please go back and click “ADOPT” from a pet card.
          </Typography>
        ) : (
          <Paper sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={pet.image_url}
                  alt={pet.name}
                  sx={{ width: 72, height: 72 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.species} {pet.breed ? `• ${pet.breed}` : ""} • {pet.gender}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
                placeholder="Tell us a bit about your home and why you want to adopt."
              />
            </Grid>
            <Grid item xs={12} display="flex" gap={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={disabled}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Snackbar
          open={snack.open}
          autoHideDuration={2000}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          <Alert
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            severity={snack.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack.msg}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
