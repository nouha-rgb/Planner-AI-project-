import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { hotelImages } from "../data/hotelImages";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios
    .get(`http://127.0.0.1:5000/hotel/${id}`)
    .then((res) => {
      setHotel(res.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [id]);


  if (loading) {
    return <p style={{ textAlign: "center" }}>Chargement...</p>;
  }

  if (!hotel) {
    return <p style={{ textAlign: "center" }}>Hôtel introuvable</p>;
  }

  const image =
    hotelImages[hotel.imageIndex] || hotelImages[0];

  const rating = Math.round(
    Number(hotel["Rating"] ?? hotel["rating"] ?? 0)
  );

  const price =
    hotel["Price Per Night (MAD)"] ??
    hotel["Price Per Night(MAD)"] ??
    hotel["Price per night (MAD)"] ??
    hotel["Price per night (MAD) "] ??
    "Non disponible";

  return (
    <div style={pageStyle}>
      <button onClick={() => navigate(-1)} style={backBtn}>
        ← Retour
      </button>

      <div style={cardStyle}>
        <img src={image} alt={hotel["Hotel Name"]} style={imageStyle} />

        <div style={contentStyle}>
          <h1>{hotel["Hotel Name"]}</h1>

          <p style={cityStyle}>{hotel["City"]}</p>

          <div style={ratingStyle}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </div>

          <p style={priceStyle}>{price} MAD / nuit</p>

          {hotel["Address"] && (
            <p><strong>Adresse :</strong> {hotel["Address"]}</p>
          )}

          {hotel["phone"] && (
            <p><strong>Téléphone :</strong> {hotel["phone"]}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  padding: "40px",
  minHeight: "100vh",
  background: "#f5f5f5",
};

const cardStyle = {
  maxWidth: "900px",
  margin: "auto",
  background: "white",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
};

const imageStyle = {
  width: "100%",
  height: "360px",
  objectFit: "cover",
};

const contentStyle = {
  padding: "30px",
};

const cityStyle = {
  color: "#777",
  marginTop: "5px",
};

const ratingStyle = {
  color: "#C9A24D",
  fontSize: "20px",
  margin: "10px 0",
};

const priceStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const backBtn = {
  marginBottom: "20px",
  background: "transparent",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};
