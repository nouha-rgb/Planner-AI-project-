import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Voyage Maroc</div>

      <ul className="nav-links">
  <li><Link to="/destination/casablanca">Destinations</Link></li>
  <li><Link to="/hotel">Hôtels</Link></li>
  <li><Link to="/restaurant">Restaurant</Link></li>
  <li><Link to="/activites">Activités</Link></li>
   <li><Link to="/stades">Stade du Maroc</Link></li>

</ul>

    </nav>
  );
}
