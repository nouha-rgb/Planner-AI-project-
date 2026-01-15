  import { useNavigate } from "react-router-dom";

  export default function CityCard({ city }) {
    const navigate = useNavigate();

    return (
      <div
        onClick={() => navigate(`/destination/${city.slug}`)}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          width: "200px",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
          transition: "0.3s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div style={{ height: "130px", overflow: "hidden" }}>
          <img
            src={city.image}
            alt={city.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ padding: "12px", backgroundColor: "#f7f7f7" }}>
          <h3 style={{ margin: "4px 0" }}>{city.name}</h3>
          <p style={{ fontSize: "13px", color: "#555" }}>
            {city.description}
          </p>
        </div>
      </div>
    );
  }
