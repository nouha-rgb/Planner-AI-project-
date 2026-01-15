import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlanningCard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/planning")}
      style={{
        marginTop: "40px",
        padding: "20px",
        border: "2px dashed #333",
        borderRadius: "10px",
        textAlign: "center",
        cursor: "pointer",
        width: "300px",
      }}
    >
      <h2>Générer un planning</h2>
      <p>Cliquez ici pour créer votre itinéraire personnalisé</p>
    </div>
  );
}
