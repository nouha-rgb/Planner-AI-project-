import { useNavigate } from "react-router-dom";
import "./heroHome.css";
import CityCarousel from "../components/CityCarousel";

export default function HeroHome({ cities, onGenerate }) {
  const navigate = useNavigate();

  return (
    <section className="hero-home">
      <div className="hero-overlay" />

      <div className="hero-container">
        {/* TEXTE */}
        <div className="hero-left">
          <h1>Destinations à découvrir</h1>
          <p>
            Explorez les plus belles villes du Maroc et préparez votre voyage
            sur mesure.
          </p>
          <button className="hero-btn" onClick={onGenerate}>
            Générer planning
          </button>
        </div>

        {/* CAROUSEL */}
        <div className="hero-right">
          <CityCarousel cities={cities} />
        </div>
      </div>
    </section>
  );
}
