import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import HotelCard from "../components/HotelCard";
import RestaurantCard from "../components/RestaurantCard";
import ActivityCard from "../components/ActivityCard";

import bgImage from "../assets/hotels-bg.jpg";
import heroImage from "../assets/hero-hotels.jpg";

import "./ItemsPage.css";

/* =========================
   API CATEGORY MAPPING
========================= */
const API_MAP = {
  hotel: "hotel",
  restaurant: "restaurant",
  activities: "activity",
};

/* =========================
   HELPERS (HOTELS)
========================= */
const getPrice = (item) =>
  Number(
    item["Price Per Night (MAD)"] ??
      item["Price Per Night(MAD)"] ??
      item["Price per night (MAD)"] ??
      item["Price per night (MAD) "] ??
      item["Price"] ??
      item["price"] ??
      item["pricePerNight"] ??
      item["price_per_night"] ??
      0
  );

const getRating = (item) =>
  Math.round(Number(item["Rating"] ?? item["rating"] ?? 0));

const getCity = (item) =>
  (item["City"] ?? item["city"] ?? "").trim();

/* =========================
   COMPONENT
========================= */
export default function ItemsPage() {
  const { category } = useParams(); // hotel | restaurant | activities

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [cityFilter, setCityFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    if (!category || !API_MAP[category]) return;

    setLoading(true);

    axios
      .get(`http://127.0.0.1:5000/${API_MAP[category]}/`)
      .then((res) => {
        setItems(res.data);
        setFilteredItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  /* =========================
     FILTERS (HOTELS ONLY)
  ========================= */
  useEffect(() => {
    let result = [...items];

    if (category === "hotel") {
      if (cityFilter) {
        result = result.filter((h) => getCity(h) === cityFilter);
      }

      if (ratingFilter) {
        result = result.filter(
          (h) => getRating(h) === Number(ratingFilter)
        );
      }

      if (priceSort === "asc") {
        result.sort((a, b) => getPrice(a) - getPrice(b));
      }

      if (priceSort === "desc") {
        result.sort((a, b) => getPrice(b) - getPrice(a));
      }
    }

    setFilteredItems(result);
  }, [cityFilter, ratingFilter, priceSort, items, category]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div
      className="hotels-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* HERO */}
      <section
        className="hotels-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />

        <h1>
          {category === "hotel"
            ? "HÔTELS AU MAROC"
            : category === "restaurant"
            ? "RESTAURANTS AU MAROC"
            : "ACTIVITÉS AU MAROC"}
        </h1>

        {/* FILTERS (HOTELS ONLY) */}
        {category === "hotel" && (
          <div className="filters">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="">Toutes les villes</option>
              <option value="Rabat">Rabat</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Agadir">Agadir</option>
              <option value="Essaouira">Essaouira</option>
              <option value="Fès">Fès</option>
              <option value="Tanger">Tanger</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">Toutes les étoiles</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="">Prix par défaut</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        )}
      </section>

      {/* CONTENT */}
      <section className="hotels-content">
        {loading ? (
          <p className="status">Chargement...</p>
        ) : filteredItems.length === 0 ? (
          <p className="status">
            Aucun{" "}
            {category === "hotel"
              ? "hôtel"
              : category === "restaurant"
              ? "restaurant"
              : "activité"}{" "}
            trouvé
          </p>
        ) : (
          <div className="hotels-grid">
            {filteredItems.map((item) =>
              category === "hotel" ? (
                <HotelCard key={item._id} hotel={item} />
              ) : category === "restaurant" ? (
                <RestaurantCard key={item._id} restaurant={item} />
              ) : (
                <ActivityCard key={item._id} activity={item} />
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}
