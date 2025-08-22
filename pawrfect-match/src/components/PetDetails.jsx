import React from "react";

const PetDetails = ({ pet }) => {
  if (!pet) return null;

  return (
    <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", borderTop: "1px solid #eee", paddingTop: "0.5rem" }}>
      <p><strong>Description:</strong> {pet.description || "N/A"}</p>
      <p><strong>Health Status:</strong> {pet.health_status || "N/A"}</p>
      <p><strong>Created At:</strong> {new Date(pet.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default PetDetails;
