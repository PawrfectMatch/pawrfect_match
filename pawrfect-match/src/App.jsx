// src/App.jsx
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetPage from "./pages/PetPage";
import FavoritePets from "./pages/FavoritePets.jsx";
import AdoptForm from "./pages/AdoptForm.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PetPage />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritePets />
            </ProtectedRoute>
          }
        />
        <Route path="/adopt/:petId" element={<AdoptForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
