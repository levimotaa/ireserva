import React from "react";
import type { Stay } from "./types";

type Props = {
  stay: Stay;
};

export default function StayCard({ stay }: Props) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={stay.imgUrl}
          alt={stay.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[#FF6B6B]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-[#1A1B4B]">
              {stay.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#1A1B4B] mb-2">
          {stay.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{stay.location}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#1A1B4B]">
              R$ {stay.price}
            </span>
            <span className="text-gray-500 text-sm">/{stay.priceType}</span>
          </div>
          <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#FF5252] transition-all duration-200 hover:shadow-lg hover:shadow-[#FF6B6B]/20 text-sm">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}
