import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cityCarousel.css";

const cities = [
  { slug: "marrakech", name: "Marrakech", desc: "Ville touristique célèbre pour sa médina.", img: "/images/Marrakech.jpg" },
  { slug: "casablanca", name: "Casablanca", desc: "Grande métropole économique et moderne.", img: "/images/Casablanca.jpg" },
  { slug: "rabat", name: "Rabat", desc: "Capitale administrative, calme et culturelle.", img: "/images/Rabat.jpg" },
  { slug: "fes", name: "Fès", desc: "Ville impériale au riche patrimoine spirituel.", img: "/images/Fes.jpg" },
  { slug: "tanger", name: "Tanger", desc: "Porte entre l’Europe et l’Afrique.", img: "/images/Tanger.jpg" },
  { slug: "essaouira", name: "Essaouira", desc: "Ville côtière, artistique et relaxante.", img: "/images/Essaouira.jpg" },
  { slug: "agadir", name: "Agadir", desc: "Station balnéaire moderne et ensoleillée.", img: "/images/Agadir.jpg" },
  { slug: "dakhla", name: "Dakhla", desc: "Lagune paradisiaque entre désert et océan.", img: "/images/Dakhla.jpg" },
  { slug: "taghazout", name: "Taghazout", desc: "Village surf et chill.", img: "/images/Taghazout.jpg" },
  {
    slug: "laayoune",
    name: "Laâyoune",
    desc: "Ville du sud, porte du Sahara marocain.",
    img: "/images/Laayoune.jpg",
  },
];

const data = [...cities, ...cities];

export default function CityCarousel() {
  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);
  const startY = useRef(0);
  const navigate = useNavigate(); // ✅ AJOUT

  /* ===== AUTOPLAY ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      moveNext();
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  /* ===== BOUCLE INFINIE ===== */
  useEffect(() => {
    if (index >= cities.length) {
      setTimeout(() => setIndex(0), 800);
    }
  }, [index]);

  const moveNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIndex((i) => i + 1);
    setTimeout(() => (isAnimating.current = false), 800);
  };

  const movePrev = () => {
    if (isAnimating.current || index === 0) return;
    isAnimating.current = true;
    setIndex((i) => i - 1);
    setTimeout(() => (isAnimating.current = false), 800);
  };

  /* ===== SCROLL ===== */
  const handleWheel = (e) => {
    if (e.deltaY > 0) moveNext();
    else movePrev();
  };

  /* ===== SWIPE ===== */
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diff = startY.current - e.changedTouches[0].clientY;
    if (diff > 60) moveNext();
    if (diff < -60) movePrev();
  };

  return (
    <div
      className="city-carousel-wrapper"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {data.slice(index, index + 3).map((city, i) => (
        <div
          key={`${city.slug}-${i}`}
          className="city-card-carousel"
          onClick={() => navigate(`/destination/${city.slug}`)} // ✅ CLIQUABLE
          style={{
            transform: `translateY(${i * 140}px)`
          }}
        >
          <img src={city.img} alt={city.name} />

          <div className="city-card-text">
            <h3>{city.name}</h3>
            <p>{city.desc}</p>
          </div>

          <div className="zellige-bg" />
        </div>
      ))}

      <div className="carousel-bars">
        <span className="bar" />
        <span className="bar active" />
        <span className="bar" />
      </div>
    </div>
  );
}
