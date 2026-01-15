import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ AJOUT

import Home from "./pages/Home";
import PlanningForm from "./pages/PlanningForm";
import PlanningResult from "./pages/PlanningResult";
import Destination from "./pages/Destination";
import ItemsPage from "./pages/ItemsPage";
import HotelDetails from "./pages/HotelDetails";
import RestaurantsPage from "./pages/RestaurantsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import StadesPage from "./pages/StadesPage";

export default function App() {
  return (
    <>
      {/* ✅ NAVBAR GLOBALE */}
      <Navbar />

      {/* ✅ CONTENU DES PAGES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planning-form" element={<PlanningForm />} />
        <Route path="/planning-result" element={<PlanningResult />} />
        <Route path="/destination/:slug" element={<Destination />} />
        <Route path="/restaurant" element={<RestaurantsPage />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/activites" element={<ActivitiesPage />} />
        <Route path="/stades" element={<StadesPage />} />
        <Route path="/:category" element={<ItemsPage />} />
      </Routes>
    </>
  );  
}
