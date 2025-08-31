import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getAccessToken, clearAccessToken } from "../lib/auth";
import { theme } from "../theme/createTheme";
import fetchCurrentUser from "../utils/fetchCurrentUser";
import Notification from "../components/Notification.jsx";
import { AvatarModal } from "../components/AvatarModal.jsx";
import {
  ThemeProvider,
  CssBaseline,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  Container,
  FormLabel,
} from "@mui/material";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState([]);

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

  const handleSaveUser = async () => {
    const token = getAccessToken();

    try {
      await axios.patch(
        `${API_BASE}/api/users/${user._id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: user.password,
          avatar: user.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertSeverity("success");
      setAlertMessage("Your changes have been saved successfully");
      setOpenAlert(true); // show Snackbar

      setTimeout(() => {
        navigate("/");
      }, 1000);
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

  const handleUserLogout = async () => {
    clearAccessToken();
    await axios.post(`${API_BASE}/api/auth/logout`); //clears cookie
        setAlertSeverity("success");
      setAlertMessage("Log out successful");
      setOpenAlert(true); // show Snackbar
    setTimeout (() => navigate("/login"), 1000)  ;
  };

  const handleAccountDeletion = async () => {
    const token = getAccessToken();
    console.log("Access token:", token);

    await axios.delete(`${API_BASE}/api/users/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    clearAccessToken();
            setAlertSeverity("success");
      setAlertMessage("Your account has been deleted successfully");
      setOpenAlert(true); // show Snackbar
    setTimeout (() =>    navigate("/register"), 1000)  ;
 ;
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) navigate("/login");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSelectAvatar = (image) => {
    setUser((prev) => ({ ...prev, avatar: image }));
  };

  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {user && (
        // Card
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
              width: { xs: "80%", md: "60%" },
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
              {/* Avatar and Modal */}
              <Avatar
                alt={user.username}
                src={user.avatar || ""}
                sx={{ width: 100, height: 100, mb: 1, cursor: "pointer" }}
                onClick={handleOpen}
              />
              <AvatarModal
                handleClose={handleClose}
                open={open}
                onSelectAvatar={onSelectAvatar}
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

            {/* User information */}
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "center", md: "space-between" },
              }}
            >
              {/* Right side - user info */}
              <Container>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center" },
                    gap: 2,
                  }}
                >
                  <FormLabel
                    sx={{ color: "warning.contrastText", fontWeight: 600 }}
                  >
                    First Name:{" "}
                  </FormLabel>
                  <TextField
                    sx={{ input: { color: "primary.dark" }, mb: 2 }}
                    variant="standard"
                    value={user.firstName} // controlled input
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: { xs: "center" },
                  }}
                >
                  <FormLabel
                    sx={{ color: "warning.contrastText", fontWeight: 600 }}
                  >
                    Last Name:{" "}
                  </FormLabel>
                  <TextField
                    variant="standard"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                    sx={{ input: { color: "primary.dark" }, mb: 2 }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: { xs: "center" },
                  }}
                >
                  <FormLabel
                    sx={{ color: "warning.contrastText", fontWeight: 600 }}
                  >
                    Email:{" "}
                  </FormLabel>
                  <TextField
                    type="email"
                    variant="standard"
                    value={user.email}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    sx={{ input: { color: "primary.dark" }, mb: 2 }}
                  />
                </Box>
              </Container>

              {/* Left side - Login info */}
              <Container>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: { xs: "center" },
                  }}
                >
                  <FormLabel
                    sx={{ color: "warning.contrastText", fontWeight: 600 }}
                  >
                    Username:{" "}
                  </FormLabel>
                  <TextField
                    variant="standard"
                    value={user.username}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, username: e.target.value }))
                    }
                    sx={{ input: { color: "primary.dark" }, mb: 2 }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: { xs: "center" },
                  }}
                >
                  <FormLabel
                    sx={{ color: "warning.contrastText", fontWeight: 600 }}
                  >
                    Password:{" "}
                  </FormLabel>
                  <TextField
                    type="password"
                    variant="standard"
                    value={user.password}
                    placeholder="********"
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    sx={{ input: { color: "primary.dark" }, mb: 2 }}
                  />
                </Box>
              </Container>
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
                onClick={handleSaveUser}
              >
                SAVE CHANGES
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
                 <Notification
        handleClose={() => {setOpenAlert(false)}}
        openAlert={openAlert}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
            <Typography
              color="text.disabled"
              sx={{ textAlign: "center", mt: 8 }}
            >
              Do you wish to delete my account?{" "}
              <Link
                sx={{ ml: 1, cursor: "pointer", color: "primary.dark" }}
                onClick={handleAccountDeletion}
              >
                Yes, Delete my account
              </Link>
            </Typography>
          </Card>
        </Box>
      )}
    </ThemeProvider>
  );
}
