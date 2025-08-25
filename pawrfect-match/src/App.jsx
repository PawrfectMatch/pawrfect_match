import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetPage from "./pages/PetPage";
import FavoritePets from "./pages/FavoritePets.jsx";
import AdoptForm from "./pages/AdoptForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pets" element={<PetPage />} />
        <Route path="/favorites" element={<FavoritePets />} />
        <Route path="/adopt/:petId" element={<AdoptForm />} />
      </Routes>
    </Router>
  );
}

export default App;
