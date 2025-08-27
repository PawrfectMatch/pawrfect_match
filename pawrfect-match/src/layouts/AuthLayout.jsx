import { theme } from "../theme/createTheme";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";

export default function AuthLayout({ children, image }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ minHeight: "100vh", minWidth: "100vw" }}>
        {/* Left side - Image */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",

            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: { xs: "contain", md: "cover" },
            backgroundPosition: "center",
            bgcolor: "background.secondary",
            height: { xs: "35vh", md: "100vh" }, // Shorter on mobile
          }}
        ></Grid>

        {/* Right side - Login form */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            bgcolor: "background.secondary",
            minHeight: { xs: "65vh", md: "100vh" },
            width: "100%",
          }}
        >
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
