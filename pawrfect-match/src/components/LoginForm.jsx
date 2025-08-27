import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if valid, false if array not empty
  };

  // Form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return; 

  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      { username, password },
      { withCredentials: true }
    );
    console.log("Login success", response.data.accessToken);
    localStorage.setItem("accessToken", response.data.accessToken);

    setErrors({}); 

    setAlertSeverity("success");
    setAlertMessage("Login success!");
    setOpenAlert(true); 

 
    setTimeout (() => navigate("/pets"), 1000); 
  
  } catch (err) {
    const errorMessage = err.response?.data?.msg || err.message || "Login failed";

    // Keep validation errors as object, but store server error separately
    setErrors((prev) => ({ ...prev, server: errorMessage }));
    setAlertSeverity("error");
    setAlertMessage(errorMessage);
    setOpenAlert(true); // show Snackbar
    console.log(errorMessage);
  }
};


  // Notification's SnackBar functionality
  // const handleSnackbar = () => {
  //   setOpenAlert(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username} // converts error.username into a boolean, so error= true or false
        helperText={errors.username}
      ></TextField>
      <TextField
        sx={{ mb: 5 }}
        label="Password"
        variant="filled"
        type="password"
        aria-label="
            Enter your password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password} // converts error.password into a boolean, so error= true or false
        helperText={errors.password}
      ></TextField>
      <Button
        type="submit"
        variant="outlined"
        sx={{ width: "60%", mx: "auto" }}
      >
        Sign In
      </Button>
   <Notification
  handleClose={handleClose}
  openAlert={openAlert}
  alertSeverity={alertSeverity}
  alertMessage={alertMessage}
/>
      <Typography color="text.disabled" sx={{ textAlign: "center", mt: 8 }}>
        Don't have an account? <Link sx={{ ml: 1 }}>Sign Up</Link>
      </Typography>
    </Box>
  );
}
