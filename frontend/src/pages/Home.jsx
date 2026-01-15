import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeroHome from "../components/HeroHome";
import "./home.css";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCities = async () => {
      console.log("➡️ Chargement des villes...");

      try {
        const res = await axios.get("http://127.0.0.1:5000/cities", {
          timeout: 5000,
        });

        console.log("✅ Réponse brute /cities :", res);

        const data = res.data;

        if (Array.isArray(data)) {
          setCities(data);
        } else if (data && Array.isArray(data.cities)) {
          setCities(data.cities);
        } else {
          console.warn("⚠️ Format inattendu :", data);
          setCities([]);
        }
      } catch (err) {
        console.error("❌ Erreur API /cities :", err);
        setError("Impossible de charger les villes.");
      } finally {
        console.log("🟢 Fin chargement");
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  if (loading) return <p className="center">Chargement...</p>;
  if (error) return <p className="center" style={{ color: "red" }}>{error}</p>;

  return (
    <div className="home-page">
      <HeroHome
        cities={cities}
        onGenerate={() => navigate("/planning-form")}
      />
    </div>
  );
}
