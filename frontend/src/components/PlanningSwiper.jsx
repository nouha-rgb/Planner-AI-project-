import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DayCard from "./DayCard";

export default function PlanningSwiper({ days }) {
  return (
    <Swiper spaceBetween={20} slidesPerView={1}>
      {days.map(day => (
        <SwiperSlide key={day.id}>
          <DayCard day={day} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
