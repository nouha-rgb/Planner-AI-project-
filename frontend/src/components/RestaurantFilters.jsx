export default function RestaurantFilters({
  restaurants,
  city,
  setCity,
  rating,
  setRating,
  priceOrder,
  setPriceOrder,
  selectedAmbiances,
  toggleAmbiance,
}) {
  const ambiances = [
    "Luxe",
    "Cosy",
    "Familial",
    "Calme",
    "Chic",
    "Festif",
  ];

  return (
    <div className="filters">

      {/* VILLE */}
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Toutes les villes</option>
        {[...new Set(restaurants.map(r => r.City))].map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {/* RATING */}
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        <option value={0}>Tous les ratings</option>
        <option value={3}>3+</option>
        <option value={4}>4+</option>
        <option value={4.5}>4.5+</option>
      </select>

      {/* PRIX */}
      <select value={priceOrder} onChange={(e) => setPriceOrder(e.target.value)}>
        <option value="">Prix</option>
        <option value="asc">Prix croissant</option>
        <option value="desc">Prix décroissant</option>
      </select>

      {/* AMBIANCE */}
      <div className="ambiance-box">
        {ambiances.map((amb) => (
          <button
            key={amb}
            onClick={() => toggleAmbiance(amb)}
            className={selectedAmbiances.includes(amb) ? "active" : ""}
          >
            {amb}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "12px" }}>
        (Maximum 2 ambiances)
      </p>

    </div>
  );
}
