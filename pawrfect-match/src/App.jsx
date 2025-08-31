// App.jsx
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetPage from "./pages/PetPage";
import FavoritePets from "./pages/FavoritePets.jsx";
import AdoptForm from "./pages/AdoptForm.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PetPage />} />
        <Route path="/pets" element={<PetPage />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritePets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adopt/:petId"
          element={
            <ProtectedRoute>
              <AdoptForm />
            </ProtectedRoute>
          }
        />
            <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
