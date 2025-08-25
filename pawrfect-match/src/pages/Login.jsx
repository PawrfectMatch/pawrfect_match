import image from "../assets/images/login-transp-8.png";
// import pawImage from "../assets/images/paw-1.png";
import { theme } from "../theme/createTheme";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import {
  ThemeProvider,
  CssBaseline,
  Grid,
  Box,
  Paper,
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  Link
} from "@mui/material";

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
            bgcolor: "background.secondary",
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
          <Box
            component="form"
            noValidate
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 5,
              height: "100%",
              width: "80%"
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 56, height: 56, textAlign: "center", mb: 2, p: 2 }}
              >
                <MailLockOutlinedIcon color="text.primary" fontSize="large" />
              </Avatar>
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Sign in to adopt your pawrfect pet!
              </Typography>
            </Container>
            <TextField
              variant="filled"
              color="secondary"
              sx={{ my: 2 }}
              label="Username"
              type="text"
              aria-label="
            Enter your username"
              name="username"
            ></TextField>
            <TextField
              sx={{ mb: 5 }}
              label="Password"
              variant="filled"
              type="password"
              aria-label="
            Enter your password"
              name="password"
            ></TextField>
            <Button type="submit" variant="outlined" sx={{width: "60%", mx:"auto"}}>
              Sign In
            </Button>
            <Typography color="text.disabled" sx={{textAlign: "center", mt: 8}}>Don't have an account? <Link sx={{ml: 1 }}>Sign Up</Link></Typography>
          </Box>
        </Grid>

        {/* <Box
          component="img"
          src={pawImage}
          sx={{
            position: "absolute",
            bottom: 0,
            left: "45%",
            transform: "translateX(-50%)", 
            width: { xs: "100px", md: "400px" }, 
            height: "auto",
            overflow: "hidden",
          }}
        ></Box> */}
      </Grid>
    </ThemeProvider>
  );
}
