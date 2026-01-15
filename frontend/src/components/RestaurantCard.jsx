import { motion } from "framer-motion";
import { restaurantImages } from "../data/restaurantImages";
import "./RestaurantCard.css";

export default function RestaurantCard({ restaurant, index }) {
  const image =
    restaurantImages[index % restaurantImages.length];

  return (
    <motion.div
      className="hotel-card"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <img
        src={image}
        alt={restaurant.Restaurant}
        className="hotel-image"
      />

      <div className="hotel-content">
        <h3>{restaurant.Restaurant}</h3>

        <p className="city">{restaurant.City}</p>

        <div className="rating">
          {"⭐".repeat(Math.round(restaurant.Rating))}
        </div>

        <p className="price">{restaurant.Price} MAD</p>

        <span className="ambiance">
          {Array.isArray(restaurant.ambiance)
            ? restaurant.ambiance.join(", ")
            : restaurant.ambiance}
        </span>
      </div>
    </motion.div>
  );
}
