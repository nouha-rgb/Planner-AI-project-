import { useNavigate } from "react-router-dom";
import "./destinationHero.css";

export default function DestinationHero({ city, subtitle, image }) {
  const navigate = useNavigate();

  return (
    <section
      className="destination-hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.45),
            rgba(0,0,0,0.65)
          ),
          url(${image})
        `,
      }}
    >
      <div className="destination-hero-content">
        <h1>{city}</h1>
        <p>{subtitle}</p>

        <button onClick={() => navigate("/planning-form")}>
          Générer mon planning
        </button>
      </div>
    </section>
  );
}
