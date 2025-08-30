// src/components/adoption/Step3Review.jsx
//main
import React from "react";
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
} from "@mui/material";

export default function Step3Review({ form, pet, onChange }) {
  // Labels & σειρά εμφάνισης
  const FIELDS = [
    "fullName",
    "email",
    "phone",
    "contactMethod",
    "city",
    "residentialStatus",
    "landlordPermission",
    "homeType",
    "outdoorSpace",
    "fencing",
    "adults",
    "children",
    "childrenAges",
    "allergies",
    "hasPets",
    "petTypes",
    "hoursAlone",
    "activityLevel",
    "sleepPlace",
    "caregiver",
    "whyThisPet",
  ];

  const LABELS = {
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    contactMethod: "Preferred contact",
    city: "City / Area",
    residentialStatus: "Residential status",
    landlordPermission: "Landlord permission",
    homeType: "Home type",
    outdoorSpace: "Outdoor space",
    fencing: "Fencing",
    adults: "Adults in home",
    children: "Children in home",
    childrenAges: "Ages of children",
    allergies: "Allergies",
    hasPets: "Other pets at home",
    petTypes: "Type of other pets",
    hoursAlone: "Hours pet alone daily",
    activityLevel: "Activity level",
    sleepPlace: "Sleep place",
    caregiver: "Primary caregiver",
    whyThisPet: "Why this pet?",
  };

  // Κανόνες προβολής (όταν έχουν νόημα)
  const shouldShow = (key) => {
    if (key === "landlordPermission" && form.residentialStatus !== "Renting")
      return false;
    if (key === "childrenAges" && !Number(form.children) > 0) return false;
    if (key === "petTypes" && form.hasPets !== "Yes") return false;
    // Απόκρυψη των consent πεδίων — εμφανίζονται ως checkboxes κάτω
    if (["confirmInfo", "agreePolicies", "consentContact"].includes(key))
      return false;
    return true;
  };

  const formatValue = (val) => {
    if (val === undefined || val === null || val === "") return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return String(val);
  };

  const isLongField = (key) => key === "whyThisPet";

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: "primary.dark" }}>
        Review your answers
      </Typography>

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 2 }}>
        <Grid container spacing={2}>
          {FIELDS.filter(shouldShow).map((key) => (
            <Grid key={key} item xs={12} md={isLongField(key) ? 12 : 6}>
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1.5,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", letterSpacing: 0.2 }}
                >
                  {LABELS[key] || key}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 0.25, color: "primary.dark", fontWeight: 600 }}
                >
                  {formatValue(form[key])}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "grid", gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!form.confirmInfo}
              onChange={onChange}
              name="confirmInfo"
            />
          }
          label="I confirm the information is accurate"
          sx={{ color: "primary.dark" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!form.agreePolicies}
              onChange={onChange}
              name="agreePolicies"
            />
          }
          label="I agree to the adoption policies"
          sx={{ color: "primary.dark" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!form.consentContact}
              onChange={onChange}
              name="consentContact"
            />
          }
          label="I consent to being contacted"
          sx={{ color: "primary.dark" }}
        />
      </Box>
    </Box>
  );
}
