import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { hotelImages } from "../data/hotelImages";
import "./HotelCard.css";

/* HELPERS */
const getHotelName = (hotel) =>
  hotel["Hotel Name"] ??
  hotel["Hotel name"] ??
  hotel["hotelName"] ??
  "Hôtel";

const getPrice = (hotel) =>
  hotel["Price Per Night (MAD)"] ??
  hotel["Price Per Night(MAD)"] ??
  hotel["Price per night (MAD)"] ??
  hotel["Price per night (MAD) "] ??
  hotel["Price"] ??
  hotel["price"] ??
  hotel["pricePerNight"] ??
  "—";

const getRating = (hotel) => {
  const rating =
    hotel["Rating"] ??
    hotel["Rating "] ??
    hotel["rating"] ??
    hotel["rating "] ??
    0;

  return Math.round(Number(rating));
};

export default function HotelCard({ hotel }) {
  const image =
    hotelImages[Math.round(hotel.imageIndex)] || hotelImages[1];

  return (
    <Link to={`/hotel/${hotel._id}`} className="hotel-link">
      <motion.div
        className="hotel-card"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 180 }}
      >
        {/* IMAGE */}
        <img
          src={image}
          alt={getHotelName(hotel)}
          className="hotel-image"
        />

        {/* CONTENT AVEC ZELLIGE */}
        <div className="hotel-content">
          <h3>{getHotelName(hotel)}</h3>
          <p className="city">{hotel.City}</p>

          <div className="rating">
            {getRating(hotel) > 0
              ? "⭐".repeat(getRating(hotel))
              : "—"}
          </div>

          <p className="price">
            {getPrice(hotel)} MAD / nuit
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
