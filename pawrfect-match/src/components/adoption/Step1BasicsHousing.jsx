//main
import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const fieldSx = {
  "& .MuiInputBase-input": { color: "primary.dark" },
  "& .MuiInputLabel-root": { color: "primary.dark" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.dark" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.dark" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "primary.dark" },
};

const selectSx = {
  minWidth: 260,
  "& .MuiSelect-select": { color: "primary.dark" },
  ...fieldSx,
};

// helper for ToggleButtonGroup -> parent onChange
const makeToggleHandler = (name, onChange) => (_e, val) => {
  if (val !== null) onChange({ target: { name, value: val } });
};

export default function Step1BasicsHousing({ form, onChange }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: "primary.dark" }}>
        Contact details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            fullWidth
            required
            sx={fieldSx}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="email"
            label="Email"
            name="email"
            value={form.email}
            onChange={onChange}
            fullWidth
            required
            sx={fieldSx}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            fullWidth
            sx={fieldSx}
          />
        </Grid>

        {/* Preferred Contact → segmented */}
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 0.5, color: "primary.dark" }}>
            Preferred Contact
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={form.contactMethod}
            onChange={makeToggleHandler("contactMethod", onChange)}
            size="medium"
            aria-label="Preferred contact"
          >
            <ToggleButton value="Email">Email</ToggleButton>
            <ToggleButton value="Phone">Phone</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 2, color: "primary.dark" }}>
        Housing
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="City / Area"
            name="city"
            value={form.city}
            onChange={onChange}
            fullWidth
            sx={fieldSx}
          />
        </Grid>

        {/* Residential Status → segmented */}
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 0.5, color: "primary.dark" }}>
            Residential Status
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={form.residentialStatus}
            onChange={makeToggleHandler("residentialStatus", onChange)}
            size="medium"
            aria-label="Residential status"
          >
            <ToggleButton value="Owner">Owner</ToggleButton>
            <ToggleButton value="Renting">Renting</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {form.residentialStatus === "Renting" && (
          <Grid item xs={12}>
            <RadioGroup
              row
              name="landlordPermission"
              value={form.landlordPermission}
              onChange={onChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Landlord permission: Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        )}

        {/* Home Type */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={selectSx}>
            <InputLabel id="home-type-label">Home Type</InputLabel>
            <Select
              labelId="home-type-label"
              id="home-type"
              name="homeType"
              value={form.homeType}
              onChange={onChange}
              label="Home Type"
            >
              <MenuItem value="Apartment" sx={{ color: "primary.dark" }}>Apartment</MenuItem>
              <MenuItem value="House" sx={{ color: "primary.dark" }}>House</MenuItem>
              <MenuItem value="Farm" sx={{ color: "primary.dark" }}>Farm</MenuItem>
              <MenuItem value="Other" sx={{ color: "primary.dark" }}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Outdoor Space */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={selectSx}>
            <InputLabel id="outdoor-space-label">Outdoor Space</InputLabel>
            <Select
              labelId="outdoor-space-label"
              id="outdoor-space"
              name="outdoorSpace"
              value={form.outdoorSpace}
              onChange={onChange}
              label="Outdoor Space"
            >
              <MenuItem value="None" sx={{ color: "primary.dark" }}>None</MenuItem>
              <MenuItem value="Balcony" sx={{ color: "primary.dark" }}>Balcony</MenuItem>
              <MenuItem value="Yard" sx={{ color: "primary.dark" }}>Yard</MenuItem>
              <MenuItem value="Garden" sx={{ color: "primary.dark" }}>Garden</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Fencing */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={selectSx}>
            <InputLabel id="fencing-label">Fencing</InputLabel>
            <Select
              labelId="fencing-label"
              id="fencing"
              name="fencing"
              value={form.fencing}
              onChange={onChange}
              label="Fencing"
            >
              <MenuItem value="None" sx={{ color: "primary.dark" }}>None</MenuItem>
              <MenuItem value="Partial" sx={{ color: "primary.dark" }}>Partial</MenuItem>
              <MenuItem value="Full" sx={{ color: "primary.dark" }}>Fully fenced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
