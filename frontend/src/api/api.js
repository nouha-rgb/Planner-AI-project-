const API = "http://localhost:8000";

export const getCities = async () =>
  fetch(`${API}/cities`).then(res => res.json());

export const getRestaurants = async () =>
  fetch(`${API}/restaurants`).then(res => res.json());

export const getHotels = async () =>
  fetch(`${API}/hotels`).then(res => res.json());

export const getActivities = async () =>
  fetch(`${API}/activities`).then(res => res.json());

export const generatePlan = async (form) => {
  const res = await fetch("http://localhost:8000/planner/generate-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return await res.json();
};

