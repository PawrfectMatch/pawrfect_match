import React from "react";
import PetCard from "./PetCard";

const PetGrid = ({ pets }) => {
  if (!pets || pets.length === 0) return <p>No pets found.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {pets.map(pet => <PetCard key={pet._id} pet={pet} />)}
    </div>
  );
};

export default PetGrid;
