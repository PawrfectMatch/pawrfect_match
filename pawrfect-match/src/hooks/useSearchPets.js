import { useState, useEffect } from "react";

const useSearchPets = (allPets, query) => {
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    if (!query) {
      setFilteredPets(allPets);
    } else {
      const lowerQuery = query.toLowerCase();
      const results = allPets.filter(
        pet => pet.name.toLowerCase().includes(lowerQuery) || pet._id.includes(query)
      );
      setFilteredPets(results);
    }
  }, [allPets, query]);

  return filteredPets;
};

export default useSearchPets;
