import axios from "axios";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import {
  Box,
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  Link,
} from "@mui/material";

export default function LoginForm() {
  async function loginAction(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password }
      );
      console.log("Login success", response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box
      component="form"
      action={loginAction}
      noValidate
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 5,
        height: "100%",
        width: "80%",
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
      <Button
        type="submit"
        variant="outlined"
        sx={{ width: "60%", mx: "auto" }}
      >
        Sign In
      </Button>
      <Typography color="text.disabled" sx={{ textAlign: "center", mt: 8 }}>
        Don't have an account? <Link sx={{ ml: 1 }}>Sign Up</Link>
      </Typography>
    </Box>
  );
}
