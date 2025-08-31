import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAccessToken, clearAccessToken } from "../lib/auth";
import { theme } from "../theme/createTheme";
import fetchCurrentUser from "../utils/fetchCurrentUser";
import {
  ThemeProvider,
  CssBaseline,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUserLogout = async () => {
    clearAccessToken();
    await axios.post(`${API_BASE}/api/auth/logout`); //clears cookie
    navigate("/login");
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) navigate("/login");

  const avatarOptions = [
    "https://res.cloudinary.com/caggel/image/upload/v1756658601/avatar7_y2wltl.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar5_ir4kz9.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658599/avatar6_mok9ke.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar3_mwmsg6.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar4_qsxdos.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar1_e2pbus.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658598/avatar2_ewjt0j.png",
    "https://res.cloudinary.com/caggel/image/upload/v1756658597/avatar8_qk4odn.png",
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
          bckColor: "background.default",
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: "80%", md: "60%" },
            width: "100%",
            p: 3,
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              alt={user.username}
              src={user.avatar || ""}
              sx={{ width: 100, height: 100, mb: 1 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "primary.dark" }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" color="warning.contrastText">
              @{user.username}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <CardContent sx={{ color: "warning.contrastText" }}>
            <Typography variant="body1">
              <strong>First name:</strong> {user.firstName}
            </Typography>
            <Typography variant="body1">
              <strong>Last name:</strong> {user.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Password:</strong> {user.password}
            </Typography>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              gap: { xs: 3, md: 5 },
              my: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{ alignSelf: "center", width: 150 }}
              onClick={handleUserLogout}
            >
              Update User
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{ alignSelf: "center", width: 150 }}
              onClick={handleUserLogout}
            >
              Log out
            </Button>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
