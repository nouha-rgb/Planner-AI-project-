import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantFilters from "../components/RestaurantFilters";
import "./RestaurantsPage.css";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);
  const [priceOrder, setPriceOrder] = useState("");
  const [selectedAmbiances, setSelectedAmbiances] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/restaurant")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleAmbiance = (amb) => {
    setSelectedAmbiances((prev) => {
      if (prev.includes(amb)) return prev.filter((a) => a !== amb);
      if (prev.length === 2) return prev;
      return [...prev, amb];
    });
  };

  const filteredRestaurants = restaurants
    .filter((r) => {
      if (city && r.City !== city) return false;
      if (rating && r.Rating < rating) return false;

      if (selectedAmbiances.length > 0) {
        const ambs = Array.isArray(r.ambiance)
          ? r.ambiance
          : [r.ambiance];

        if (!selectedAmbiances.some((a) => ambs.includes(a))) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (priceOrder === "asc") return a.Price - b.Price;
      if (priceOrder === "desc") return b.Price - a.Price;
      return 0;
    });

  return (
  <>
    {/* ===== HERO ===== */}
    <div className="hero-restaurant">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>Restaurants au Maroc</h1>
        <p>Découvrez les meilleures tables selon vos envies</p>
      </div>
    </div>

    {/* ===== FILTERS ===== */}
    <div className="filters-container">
      <RestaurantFilters
        restaurants={restaurants}
        city={city}
        setCity={setCity}
        rating={rating}
        setRating={setRating}
        priceOrder={priceOrder}
        setPriceOrder={setPriceOrder}
        selectedAmbiances={selectedAmbiances}
        toggleAmbiance={toggleAmbiance}
      />
    </div>

    {/* ===== CARDS GRID ===== */}
    <div className="grid">
      {filteredRestaurants.map((r, index) => (
        <RestaurantCard
          key={r._id}
          restaurant={r}
          index={index}
        />
      ))}
    </div>
  </>
);

}
