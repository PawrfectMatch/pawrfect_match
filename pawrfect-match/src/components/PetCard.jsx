import React, { useState } from "react";
import PetDetails from "./PetDetails";

const PetCard = ({ pet }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", width: "200px" }}>
      <img
        src={pet.image_url || "https://via.placeholder.com/150"}
        alt={pet.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{pet.name}</h3>
      <p>{pet.species} - {pet.breed || "Unknown"}</p>
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>{pet.adopted ? "Adopted" : "Available"}</p>

      <button
        onClick={() => setSelected(!selected)}
        style={{ marginTop: "0.5rem", padding: "0.3rem 0.6rem", borderRadius: "4px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}
      >
        {selected ? "Hide Details" : "View Details"}
      </button>

      {selected && <PetDetails pet={pet} />}
    </div>
  );
};

export default PetCard;
