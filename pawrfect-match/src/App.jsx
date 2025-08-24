import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetPage from "./pages/PetPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pets" element={<PetPage />} />
      </Routes>
    </Router>
  );
}

export default App;