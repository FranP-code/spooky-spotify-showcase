"use client";
import React, { useRef, useState } from "react";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./swiper.css";
import { EffectCards } from "swiper/modules";

export function Swiper({ children }: { children: React.ReactNode }) {
  return (
    <SwiperReact
      style={{
        width: "144px",
        height: "144px",
      }}
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {children}
    </SwiperReact>
  );
}

export default Swiper;
