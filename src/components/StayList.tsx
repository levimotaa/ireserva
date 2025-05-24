import React from "react";
import type { Stay } from "./types";

interface StayListProps {
  stays: Stay[];
}

export default function StayList({ stays }: StayListProps) {
  if (!stays || stays.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#23244C] mb-2">
          Nenhuma hospedagem encontrada
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stays.map((stay) => (
        <div key={stay.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <div className="relative h-48">
            <img
              src={stay.imgUrl}
              alt={stay.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-sm">{stay.rating}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#1A1B4B] mb-2">
              {stay.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{stay.location}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-[#1A1B4B]">
                  R$ {stay.price}
                </span>
                <span className="text-gray-500 text-sm">/{stay.priceType}</span>
              </div>
            </div>

            <button
              onClick={() => alert('Funcionalidade de reserva em desenvolvimento!')}
              className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Reservar Agora
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
