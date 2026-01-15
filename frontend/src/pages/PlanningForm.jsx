import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PlanningForm.css";

const API_BASE = "http://localhost:5000";

const cityImages = {
  Agadir: "Agadir.jpg",
  Casablanca: "Casablanca.jpg",
  Dakhla: "Dakhla.jpg",
  Essaouira: "Essaouira.jpg",
  Fes: "Fes.jpg",
  Laayoune: "Laayoune.jpg",
  Marrakech: "Marrakech.jpg",
  Rabat: "Rabat.jpg",
  Tanger: "Tanger.jpg",
  Taghazout: "Taghazout.jpg",
};

function normalizeCityName(name) {
  const map = {
    dakha: "Dakhla",
    dakhla: "Dakhla",
    fes: "Fes",
    fès: "Fes",
    laayoune: "Laayoune",
    laâyoune: "Laayoune",
  };

  const key = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return map[key] || name;
}

export default function PlanningForm() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(5000);
  const [cities, setCities] = useState([]);
  const [days, setDays] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/cities/`).then(res => {
      setCities(res.data);
      const init = {};
      res.data.forEach(c => (init[c.name] = 0));
      setDays(init);
    });
  }, []);

  const changeDays = (city, delta) => {
    setDays(prev => ({
      ...prev,
      [city]: Math.max(0, (prev[city] || 0) + delta),
    }));
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      const selectedCities = Object.entries(days)
        .filter(([_, d]) => d > 0)
        .map(([name, d]) => ({ name: normalizeCityName(name), days: d }));

      const res = await axios.post(`${API_BASE}/planner/generate`, {
        budget,
        cities: selectedCities,
      });

      localStorage.setItem("planning", JSON.stringify(res.data));
      navigate("/planning-result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-bg">
      <div className="form-overlay">

        <h1>Planifiez votre voyage</h1>

        <div className="budget">
           Budget
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}
          />
          DH
        </div>

        <div className="cities-grid">
          {cities.map((city) => (
            <div
              key={city.name}
              className="city-card"
              style={{
                backgroundImage: `url(/images/${cityImages[city.name] || "Agadir.jpg"})`,
              }}
            >
              <div className="city-name">{city.name}</div>
              <div className="counter">
                <button onClick={() => changeDays(city.name, -1)}>-</button>
                <span>{days[city.name] || 0}</span>
                <button onClick={() => changeDays(city.name, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <button className="generate-btn" onClick={generatePlan} disabled={loading}>
          {loading ? "Génération..." : "Générer"}
        </button>

      </div>
    </div>
  );
}
