import { useState } from "react";
import "./PlanningSlider.css";

export default function PlanningSlider({ planning }) {
  const [index, setIndex] = useState(0);
  const day = planning[index];

  return (
    <div className="slider-container">
      <button
        disabled={index === 0}
        onClick={() => setIndex(i => i - 1)}
      >
        ‹
      </button>

      <div className="day-card">
        <h2>Jour {index + 1} — {day.city}</h2>

        {day.hotel && (
          <div className="block">
            <h3>🏨 Hôtel</h3>
            <p>{day.hotel["Hotel Name"]}</p>
          </div>
        )}

        {day.meals && (
          <div className="block">
            <h3>🍽️ Restaurants</h3>
            <p>Petit-déj : {day.meals.breakfast.Restaurant}</p>
            <p>Déjeuner : {day.meals.lunch.Restaurant}</p>
            <p>Dîner : {day.meals.dinner.Restaurant}</p>
          </div>
        )}

        <div className="block">
          <h3>🎯 Activités</h3>
          <p>Découverte libre & activités locales</p>
        </div>
      </div>

      <button
        disabled={index === planning.length - 1}
        onClick={() => setIndex(i => i + 1)}
      >
        ›
      </button>
    </div>
  );
}
