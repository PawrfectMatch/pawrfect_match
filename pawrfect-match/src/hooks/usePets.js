import { useState, useEffect } from "react";
import axios from "axios";

const usePets = () => {
  const [allPets, setAllPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pets");
        setAllPets(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching pets");
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return { allPets, loading, error };
};

export default usePets;
