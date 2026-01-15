import { hotelImages } from "../data/hotelImages";
import { restaurantImages } from "../data/restaurantImages";
import { activityImages } from "../data/activityImages";

export function buildDailyPlanning(trip) {
  let days = [];
  let dayCounter = 1;

  trip.forEach(cityPlan => {
    for (let i = 0; i < cityPlan.days; i++) {
      days.push({
        id: dayCounter,
        city: cityPlan.city,

        hotel: cityPlan.hotel
          ? {
              ...cityPlan.hotel,
              image: hotelImages[cityPlan.hotel.imageIndex || 0],
            }
          : null,

        morning: buildSlot(cityPlan),
        afternoon: buildSlot(cityPlan),
        evening: buildSlot(cityPlan),
      });

      dayCounter++;
    }
  });

  return days;
}

function buildSlot(cityPlan) {
  return {
    restaurant: cityPlan.meals
      ? {
          ...pick(cityPlan.meals),
          image: restaurantImages[randomIndex(restaurantImages.length)],
        }
      : null,

    activity: cityPlan.activity
      ? {
          ...cityPlan.activity,
          image: activityImages[randomIndex(activityImages.length)],
        }
      : null,
  };
}

function pick(meals) {
  const arr = [meals.breakfast, meals.lunch, meals.dinner].filter(Boolean);
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
}

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}
