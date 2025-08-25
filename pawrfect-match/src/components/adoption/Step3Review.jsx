//main
import React from "react";
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";

export default function Step3Review({ form, pet, onChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: "primary.dark" }}>
        Review your answers
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "inherit" }}>
{JSON.stringify(form, null, 2)}
        </pre>
      </Paper>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "grid", gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.confirmInfo}
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
              checked={form.agreePolicies}
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
              checked={form.consentContact}
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
