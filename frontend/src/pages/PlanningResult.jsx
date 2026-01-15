import { useEffect, useState } from "react";
import DayCard from "../components/DayCard";
import "./PlanningResult.css";

function getDayTotal(day) {
  let total = 0;
  if (day.hotel?.price) total += day.hotel.price;

  ["morning","afternoon","evening"].forEach(slot => {
    if (day[slot]?.restaurant?.price) total += day[slot].restaurant.price;
    if (day[slot]?.activity?.price) total += day[slot].activity.price;
  });

  return total;
}

function getTripTotal(planning) {
  return planning.reduce((s, d) => s + getDayTotal(d), 0);
}

export default function PlanningResult() {
  const [planning, setPlanning] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("planning");
    if (data) {
      const parsed = JSON.parse(data);
      setPlanning(parsed?.success ? parsed.planning : parsed);
    }
  }, []);

  if (!planning) return null;

  const day = planning[active];

  return (
    <div
      className="planning-bg"
      style={{ backgroundImage: "url(/doud.png)" }}
    >
      <div className="planning-glass">

        <div className="planning-top">
          <div>Total : {getTripTotal(planning)} DH</div>
          <div>Jour {day.id} : {getDayTotal(day)} DH</div>
        </div>

        <div className="planning-tabs">
          {planning.map((d, i) => (
            <button
              key={d.id}
              className={i === active ? "tab active" : "tab"}
              onClick={() => setActive(i)}
            >
              Jour {d.id}
            </button>
          ))}
        </div>

        <DayCard day={day} />

      </div>
    </div>
  );
}
