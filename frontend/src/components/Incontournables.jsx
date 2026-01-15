import "./incontournables.css";
import { INCONTOURNABLES } from "../data/incontournables";

export default function Incontournables({ city }) {
  const items = INCONTOURNABLES[city];

  if (!items) return null;

  return (
    <section className="incontournables">
      <h2>Incontournables</h2>

      <div className="incontournables-list">
        {items.map((item, index) => (
          <div className="incontournable-card" key={index}>
            <img src={item.image} alt={item.title} />

            <div className="incontournable-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
