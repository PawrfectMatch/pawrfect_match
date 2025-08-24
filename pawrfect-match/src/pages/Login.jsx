import { ThemeProvider, CssBaseline, Grid, Box } from "@mui/material";
import { theme } from "../theme/createTheme";
import image from "../assets/images/login-blue-light.png";
import pawImage from "../assets/images/paw-1.png";

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container sx={{ minHeight: "100vh", minWidth: "100vw" }}>
        {/* Left side - Image */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Grid>

        {/* Right side - Login form */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          sx={{
            bgcolor: "background.secondary",
            height: "100vh",
            width: "100%",
          }}
        >
          Login form
        </Grid>

        <Box
          component="img"
          src={pawImage}
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)", // centers horizontally
            width: { xs: "100px", md: "400px" }, // responsive size
            height: "auto",
          }}
        ></Box>
      </Grid>
    </ThemeProvider>
  );
}
