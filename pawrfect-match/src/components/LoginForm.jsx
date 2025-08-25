import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import {
  Box,
  TextField,
  Typography,
  Container,
  Avatar,
  Button,
  Link,
  Snackbar
} from "@mui/material";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if valid, false if array not empty
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // if false stops submission

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("Login success", response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setErrors({});
      navigate("/pets")
    } catch (err) {
      setErrors({ server: err.response?.data?.msg || "Login failed" });
      console.log(err.response.data.msg);
    }
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
      <Typography color="text.disabled" sx={{ textAlign: "center", mt: 8 }}>
        Don't have an account? <Link sx={{ ml: 1 }}>Sign Up</Link>
      </Typography>
    </Box>
  );
}
