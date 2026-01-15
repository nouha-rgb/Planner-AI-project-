import { motion } from "framer-motion";
import { activityImages } from "../data/activityImages";
import "./ActivityCard.css";

export default function ActivityCard({ activity, index }) {
  const image = activityImages[index % activityImages.length];

  return (
    <motion.div
      className="activity-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="activity-image">
        <img src={image} alt={activity["Nom de l'activité"]} />

        {/* ✅ BADGE CATÉGORIE */}
        <span className="activity-badge">{activity.Categorie}</span>
      </div>

      <div className="activity-content">
        <p className="city">{activity.City}</p>
        <h3>{activity["Nom de l'activité"]}</h3>
        <p className="desc">{activity.Description}</p>
        <p className="price">{activity.Budget} MAD</p>
      </div>
    </motion.div>
  );
}
