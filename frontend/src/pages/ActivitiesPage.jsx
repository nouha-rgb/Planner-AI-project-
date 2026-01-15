import { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import heroImage from "../assets/activities/nature.jpg";
import "./ActivitiesPage.css";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [city, setCity] = useState("all");
  const [budget, setBudget] = useState("all"); // all | free
  const [sortPrice, setSortPrice] = useState("none"); // asc | desc | none

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/activity/")
      .then((res) => setActivities(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ===== FILTER + SORT =====
  const filteredActivities = activities
    .filter((a) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(a.Categorie)
      )
        return false;

      if (city !== "all" && a.City !== city) return false;
      if (budget === "free" && a.Budget !== 0) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortPrice === "asc") return a.Budget - b.Budget;
      if (sortPrice === "desc") return b.Budget - a.Budget;
      return 0;
    });

  const cities = ["all", ...new Set(activities.map((a) => a.City))];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="activities-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>ACTIVITÉS AU MAROC</h1>
          <p>Explorez selon vos envies</p>

          {/* ===== FILTER PANEL ===== */}
          <div className="filters-panel">
            {/* Categories */}
            <div className="filter-row">
              {["Nature", "Culture", "Sport", "Loisir", "Aventure"].map(
                (cat) => (
                  <button
                    key={cat}
                    className={`filter-chip ${
                      selectedCategories.includes(cat) ? "active" : ""
                    }`}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* City + Budget + Sort */}
            <div className="filter-row selects">
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="all">Toutes les villes</option>
                {cities
                  .filter((c) => c !== "all")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="all">Tous budgets</option>
                <option value="free">Gratuit</option>
              </select>

              <select
                value={sortPrice}
                onChange={(e) => setSortPrice(e.target.value)}
              >
                <option value="none">Trier par prix</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="activities-section">
        <div className="activities-grid">
          {filteredActivities.map((activity, index) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
