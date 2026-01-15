import { useParams } from "react-router-dom";
import DestinationHero from "../components/DestinationHero";
import Incontournables from "../components/Incontournables";
import Experiences from "../components/Experiences/Experiences";
import { DESTINATIONS } from "../data/destinations";
import "./destination.css";

export default function Destination() {
  const { slug } = useParams();
  const data = DESTINATIONS[slug];

  if (!data) {
    return <p style={{ padding: 40 }}>Ville non encore disponible</p>;
  }

  return (
    <div className="destination-page">

      {/* HERO */}
      <DestinationHero
        city={data.city}
        subtitle={data.subtitle}
        image={data.heroImage}
      />

      {/* POURQUOI VISITER */}
      <section className="destination-why-layout">
        {/* TEXTE */}
        <div className="destination-why">
          <h2>Pourquoi visiter cette ville ?</h2>

          {data.why.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        {/* IMAGES */}
        <div className="destination-intro-images">
          <div
            className="intro-image-rect"
            style={{
              backgroundImage: `url(/images/cities/${slug}/gallery/1.jpg)`
            }}
          />
          <div
            className="intro-image-circle"
            style={{
              backgroundImage: `url(/images/cities/${slug}/gallery/2.jpg)`
            }}
          />
        </div>
      </section>

      {/* CONTENU */}
      <div className="destination-scroll">
        <Incontournables city={slug} />
        <Experiences city={slug} />
      </div>
    </div>
  );
}
