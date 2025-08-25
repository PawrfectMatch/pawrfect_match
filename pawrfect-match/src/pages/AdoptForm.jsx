//main
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  Avatar,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { adoptTheme } from "../theme/adoptTheme";

// Step components
import Step1BasicsHousing from "../components/adoption/Step1BasicsHousing.jsx";
import Step2HouseholdPetsCare from "../components/adoption/Step2HouseholdPetsCare.jsx";
import Step3Review from "../components/adoption/Step3Review.jsx";

const steps = ["Basics & Housing", "Household & Care", "Review & Submit"];

const initialForm = {
  // step 1
  fullName: "",
  email: "",
  phone: "",
  contactMethod: "Email",
  city: "",
  residentialStatus: "",
  landlordPermission: "",
  homeType: "",
  outdoorSpace: "",
  fencing: "",
  // step 2
  adults: "",
  children: "",
  childrenAges: "",
  allergies: "",
  hasPets: "",
  petTypes: "",
  spayed: "",
  vaccinated: "",
  hoursAlone: "",
  activityLevel: "",
  sleepPlace: "",
  caregiver: "",
  whyThisPet: "",
  // consents (step 3)
  confirmInfo: false,
  agreePolicies: false,
  consentContact: false,
};

export default function AdoptForm() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pet = location.state?.pet;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const canGoNext = useMemo(() => {
    if (step === 0) {
      return form.fullName && form.email && form.residentialStatus && form.homeType;
    }
    if (step === 1) {
      return form.hoursAlone && form.activityLevel && form.sleepPlace;
    }
    return true;
  }, [step, form]);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: POST /api/adoptions (petId + form)
    setSnack({ open: true, msg: "Adoption request submitted! 🎉", severity: "success" });
    setTimeout(() => navigate("/pets"), 900);
  };

  const fallback =
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop";

  return (
    <ThemeProvider theme={adoptTheme}>
      <CssBaseline />
      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 900, mx: "auto" }}>
        {/* Page Title */}
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2, color: "primary.dark" }}>
          Adoption Application
        </Typography>

        {/* Pet summary */}
        <Paper sx={{ p: 2, mb: 2 }}>
          {!pet ? (
            <Typography color="warning.main">
              No pet data provided. Please go back and click “ADOPT” from a pet card.
            </Typography>
          ) : (
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar src={pet.image_url || fallback} alt={pet.name} sx={{ width: 72, height: 72 }} />
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ color: "primary.dark" }}>{pet.name}</Typography>
                <Typography variant="body2" sx={{ color: "primary.dark", opacity: 0.8 }}>
                  {pet.species} {pet.breed ? `• ${pet.breed}` : ""} • {pet.gender}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Paper>

        {/* Stepper */}
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Stepper
            activeStep={step}
            alternativeLabel
            sx={{
              mb: 3,
              "& .MuiStepLabel-label": { color: "primary.dark !important" },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {step === 0 && <Step1BasicsHousing form={form} onChange={handleChange} />}
            {step === 1 && <Step2HouseholdPetsCare form={form} onChange={handleChange} />}
            {step === 2 && <Step3Review form={form} pet={pet} onChange={handleChange} />}

            {/* Nav buttons */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={step === 0}
                size="large"
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, color: "primary.dark", borderColor: "primary.dark" }}
              >
                Back
              </Button>

              {step < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!canGoNext}
                  size="large"
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!form.confirmInfo || !form.agreePolicies}
                  size="large"
                  sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </form>
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
