import "./experiences.css";
import { EXPERIENCES } from "../../data/experiences";

export default function Experiences({ city }) {
  const items = EXPERIENCES[city];

  if (!items) return null;

  return (
    <section className="experiences">
      <h2>Expériences</h2>

      <div className="experiences-grid">
        {items.map((exp, index) => (
          <div className="experience-card" key={index}>
            <img src={exp.image} alt={exp.title} />

            <div className="experience-content">
              <h3>{exp.title}</h3>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
