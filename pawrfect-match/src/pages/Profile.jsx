import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAccessToken, clearAccessToken } from "../lib/auth";
import fetchCurrentUser from "../utils/fetchCurrentUser";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchCurrentUser();
        setCurrentUser(data);
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
    await axios.post("http://localhost:8000/api/auth/logout"); //clears cookie
    navigate("/login")
  };

 if (isLoading) return <p>Loading...</p>;
  if (!currentUser) return <p>No user found</p>;

  return (
    <div>
      <h1>{currentUser.username}'s Profile</h1>
      <p>Email: {currentUser.email}</p>
      <p>Name: {currentUser.firstName} {currentUser.lastName}</p>
      <button onClick={handleUserLogout}>Log out</button>
    </div>
  );
}
