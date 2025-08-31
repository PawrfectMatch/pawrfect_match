//main
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import {
  validateFirstname,
  validateLastname,
  validateEmail,
  validateUsername,
  validatePassword,
} from "../utils/validation";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import {
  Box,
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  Link,
} from "@mui/material";

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  // Form validation
  const validate = () => {
    const newErrors = {};

    const firstnameError = validateFirstname(firstname);
    if (firstnameError) newErrors.firstname = firstnameError;

    const lastnameError = validateLastname(lastname);
    if (lastnameError) newErrors.lastname = lastnameError;

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if valid, false if array not empty
  };

  // Form submit
  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        { firstName: firstname, lastName:lastname, email, username, password, avatar:"https://www.freepik.com/free-vector/man-profile-account-picture_137411837.htm#fromView=keyword&page=1&position=33&uuid=8981dc7c-d9d6-4214-9a30-e6e44a8430c0&query=Avatar+Profile" },
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", response.data.accessToken);

      setErrors({});

      setAlertSeverity("success");
      setAlertMessage("Registration success!");
      setOpenAlert(true); // show Snackbar

      setTimeout(() => navigate("/pets"), 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg || err.message || "Login failed";

      // Keep validation errors as object, but store server error separately
      setErrors((prev) => ({ ...prev, server: errorMessage }));
      setAlertSeverity("error");
      setAlertMessage(errorMessage);
      setOpenAlert(true); // show Snackbar
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegistration}
      noValidate
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: { xs: "flex-start", md: "center" },
        alignItems: "center",
        p: 5,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
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
          <PermIdentityOutlinedIcon color="text.primary" fontSize="large" />
        </Avatar>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Create your account and look for your pawrfect pet!
        </Typography>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "flex-start", md: "center" },
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            width: { xs: "100%", sm: "80%" },
            gap: 2,
            my: 0.5,
          }}
        >
          <TextField
            variant="filled"
            color="secondary"
            sx={{ my: 0.5, width: { xs: "100%", sm: "80%" } }}
            label="First Name"
            type="text"
            aria-label="
            Enter your first name"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            error={!!errors.firstname} // converts error.firstname into a boolean, so error= true or false
            helperText={errors.firstname}
          ></TextField>
          <TextField
            variant="filled"
            color="secondary"
            sx={{ my: 0.5, width: { xs: "100%", sm: "80%" } }}
            label="Last Name"
            type="text"
            aria-label="
            Enter your last name"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            error={!!errors.lastname} // converts error.lastname into a boolean, so error= true or false
            helperText={errors.lastname}
          ></TextField>
        </Box>

        <TextField
          variant="filled"
          color="secondary"
          sx={{ my: 0.5, width: { xs: "100%", sm: "80%" } }}
          label="Email"
          type="text"
          aria-label="
            Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email} // converts error.lastname into a boolean, so error= true or false
          helperText={errors.email}
        ></TextField>
      </Box>

      <TextField
        variant="filled"
        color="secondary"
        sx={{ my: 0.5, width: { xs: "100%", sm: "80%" } }}
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
        sx={{ mt: 0.5, mb: 5, width: { xs: "100%", sm: "80%" } }}
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
        Register
      </Button>
      <Notification
        handleClose={handleClose}
        openAlert={openAlert}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
      <Typography color="text.disabled" sx={{ textAlign: "center", mt: 8 }}>
        Already have an account?{" "}
        <Link
          sx={{ ml: 1, cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}
