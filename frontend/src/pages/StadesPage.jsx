import "./StadesPage.css";

const stades = [
  {
    id: 1,
    name: "Stade Mohammed V",
    city: "Casablanca",
    image: "/images/stades/mohammed5.jpg",
    capacity: "67 000 places"
  },
  {
    id: 2,
    name: "Stade Prince Moulay Abdellah",
    city: "Rabat",
    image: "/images/stades/moulay-abdellah.jpg",
    capacity: "53 000 places"
  },
  {
    id: 3,
    name: "Grand Stade de Marrakech",
    city: "Marrakech",
    image: "/images/stades/marrakechstade.jpg",
    capacity: "45 000 places"
  },
  {
    id: 4,
    name: "Grand Stade de Tanger",
    city: "Tanger",
    image: "/images/stades/tangerstade.jpg",
    capacity: "65 000 places"
  },
  {
    id: 5,
    name: "Grand Stade d’Agadir",
    city: "Agadir",
    image: "/images/stades/agadir.jpg",
    capacity: "45 480 places"
  },
  {
    id: 7,
    name: "Complexe Sportif de Fès",
    city: "Fès",
    image: "/images/stades/fesstade.jpg",
    capacity: "45 000 places"
  },
  {
    id: 8,
    name: "Stade Moulay El Hassan",
    city: "Rabat",
    image: "/images/stades/moulayelhassan.jpg",
    capacity: "22 000 places"
  },
  {
    id: 9,
    name: "Stade Olympique de Rabat",
    city: "Rabat",
    image: "/images/stades/olympiquerabat.jpg",
    capacity: "21 000 places"
  },
  {
    id: 11,
    name: "le Stade Al Barid",
    city: "Rabat",
    image: "/images/stades/rabatbarid.jpg",
    capacity: "18 000 places"
  },
];

export default function StadesPage() {
  return (
    <div className="stades-page">

      {/* ===== HERO ===== */}
      <section className="stades-hero">
        <div className="overlay" />
        <h1>Stades du Maroc</h1>
        <p>CAN & Coupe du Monde 2030</p>
      </section>

      {/* ===== LISTE DES STADES ===== */}
      <section className="stades-section">
        <h2>Stades emblématiques</h2>

        <div className="stades-grid">
          {stades.map(stade => (
            <div key={stade.id} className="stade-card">
              <img src={stade.image} alt={stade.name} />
              <div className="stade-info">
                <h3>{stade.name}</h3>
                <p>{stade.city}</p>
                <span>{stade.capacity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

     

    </div>
  );
}
