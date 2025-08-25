//main
import React from "react";
import {
  Grid,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const makeToggleHandler = (name, onChange) => (_e, val) => {
  if (val !== null) onChange({ target: { name, value: val } });
};

export default function Step2HouseholdPetsCare({ form, onChange }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, color: "primary.dark" }}>
        Household
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            label="Adults in home"
            name="adults"
            value={form.adults}
            onChange={onChange}
            fullWidth
            inputProps={{ min: 0 }}
            sx={fieldSx}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="number"
            label="Children in home"
            name="children"
            value={form.children}
            onChange={onChange}
            fullWidth
            inputProps={{ min: 0 }}
            sx={fieldSx}
          />
        </Grid>

        {Number(form.children) > 0 && (
          <Grid item xs={12}>
            <TextField
              label="Ages of children"
              name="childrenAges"
              value={form.childrenAges}
              onChange={onChange}
              fullWidth
              sx={fieldSx}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <RadioGroup row name="allergies" value={form.allergies} onChange={onChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Allergies: Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel value="Not sure" control={<Radio />} label="Not sure" />
          </RadioGroup>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 2, color: "primary.dark" }}>
        Other Pets
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RadioGroup row name="hasPets" value={form.hasPets} onChange={onChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Other pets at home" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>

        {form.hasPets === "Yes" && (
          <Grid item xs={12}>
            <TextField
              label="Type of other pets"
              name="petTypes"
              value={form.petTypes}
              onChange={onChange}
              placeholder="Dog, Cat, etc."
              fullWidth
              sx={fieldSx}
            />
          </Grid>
        )}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 2, color: "primary.dark" }}>
        Care Plan
      </Typography>

      <Grid container spacing={2}>
        {/* Hours alone (Select) */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={selectSx}>
            <InputLabel id="hours-alone-label">Hours pet alone daily</InputLabel>
            <Select
              labelId="hours-alone-label"
              id="hours-alone"
              name="hoursAlone"
              value={form.hoursAlone}
              onChange={onChange}
              label="Hours pet alone daily"
            >
              <MenuItem value="<2" sx={{ color: "primary.dark" }}>&lt;2</MenuItem>
              <MenuItem value="2-4" sx={{ color: "primary.dark" }}>2–4</MenuItem>
              <MenuItem value="4-6" sx={{ color: "primary.dark" }}>4–6</MenuItem>
              <MenuItem value="6-8" sx={{ color: "primary.dark" }}>6–8</MenuItem>
              <MenuItem value=">8" sx={{ color: "primary.dark" }}>&gt;8</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Activity level → segmented */}
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 0.5, color: "primary.dark" }}>
            Activity level you can provide
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={form.activityLevel}
            onChange={makeToggleHandler("activityLevel", onChange)}
            size="medium"
            aria-label="Activity level"
          >
            <ToggleButton value="Low">Low</ToggleButton>
            <ToggleButton value="Moderate">Moderate</ToggleButton>
            <ToggleButton value="High">High</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* Sleep place (Select) */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={selectSx}>
            <InputLabel id="sleep-place-label">Where will the pet sleep?</InputLabel>
            <Select
              labelId="sleep-place-label"
              id="sleep-place"
              name="sleepPlace"
              value={form.sleepPlace}
              onChange={onChange}
              label="Where will the pet sleep?"
            >
              <MenuItem value="Bedroom" sx={{ color: "primary.dark" }}>Bedroom</MenuItem>
              <MenuItem value="Living room" sx={{ color: "primary.dark" }}>Living room</MenuItem>
              <MenuItem value="Crate" sx={{ color: "primary.dark" }}>Crate</MenuItem>
              <MenuItem value="Outdoors" sx={{ color: "primary.dark" }}>Outdoors</MenuItem>
              <MenuItem value="Other" sx={{ color: "primary.dark" }}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Primary caregiver"
            name="caregiver"
            value={form.caregiver}
            onChange={onChange}
            fullWidth
            sx={fieldSx}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Why this pet?"
            name="whyThisPet"
            value={form.whyThisPet}
            onChange={onChange}
            fullWidth
            multiline
            minRows={3}
            sx={fieldSx}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
