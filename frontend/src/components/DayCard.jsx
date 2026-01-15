import "./DayCard.css";
import { activityImages, hotelImages, restaurantImages } from "../data/images";

/* Sécurise l’accès aux images */
function safeImage(list, index) {
  if (typeof index !== "number") return list[0];
  if (index < 0 || index >= list.length) return list[0];
  return list[index];
}

function Stars({ value }) {
  const full = Math.round(value || 0);
  return <span>{"⭐".repeat(full)}</span>;
}

function InfoLine({ label, value }) {
  if (!value) return null;
  return <div className="info-line"><strong>{label}:</strong> {value}</div>;
}

export default function DayCard({ day }) {
  if (!day) return null;

  const { city, hotel, morning, afternoon, evening } = day;

  const renderCard = (item, type) => {
    if (!item) return null;

    const images =
      type === "hotel"
        ? hotelImages
        : type === "restaurant"
        ? restaurantImages
        : activityImages;

    return (
      <div className="item-card">
        <img src={safeImage(images, item.imageIndex)} alt={item.name} />
        <div className="item-content">
          <div className="item-header">
            <h4>{item.name}</h4>
            <span className="price">{item.price} DH</span>
          </div>

          <Stars value={item.rating} />

          <InfoLine label="Adresse" value={item.address} />
          <InfoLine label="Téléphone" value={item.phone} />
          <InfoLine label="Ambiance" value={item.ambiance} />
          <InfoLine label="Catégorie" value={item.category} />
          <InfoLine label="Description" value={item.description} />
        </div>
      </div>
    );
  };

  return (
    <div className="day-card">
      <h2>Jour {day.id} — {city}</h2>

      {hotel && (
        <>
          <h3>Hôtel</h3>
          {renderCard(hotel, "hotel")}
        </>
      )}

      <h3>Matin</h3>
      {renderCard(morning?.restaurant, "restaurant")}
      {renderCard(morning?.activity, "activity")}

      <h3>Après-midi</h3>
      {renderCard(afternoon?.restaurant, "restaurant")}
      {renderCard(afternoon?.activity, "activity")}

      <h3>Soirée</h3>
      {renderCard(evening?.restaurant, "restaurant")}
      {renderCard(evening?.activity, "activity")}
    </div>
  );
}
