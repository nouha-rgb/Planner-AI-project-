export default function ActivityFilters({
  selectedCategories,
  toggleCategory,
  filters,
  setFilters,
  cities,
}) {
  return (
    <div className="filters-container">

      {/* CATEGORIES */}
      <div className="filters-row">
        {["Nature", "Culture", "Sport", "Loisir", "Aventure"].map((cat) => (
          <button
            key={cat}
            className={`chip ${
              selectedCategories.includes(cat) ? "active" : ""
            }`}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DROPDOWNS */}
      <div className="filters-row filters-row--selects">
        {/* CITY */}
        <select
          value={filters.city}
          onChange={(e) =>
            setFilters({ ...filters, city: e.target.value })
          }
        >
          <option value="all">Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* BUDGET */}
        <select
          value={filters.budget}
          onChange={(e) =>
            setFilters({ ...filters, budget: e.target.value })
          }
        >
          <option value="all">Tous les budgets</option>
          <option value="free">Gratuit</option>
        </select>

        {/* SORT */}
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="none">Trier par prix</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>
    </div>
  );
}
