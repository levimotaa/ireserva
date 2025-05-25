import React, { useState, useEffect } from 'react';
import type { Stay } from './types';
import StayCard from './StayCard';
import ReservationModal from './ReservationModal';

interface StayListProps {
  stays: Stay[];
  loading: boolean;
  error: string | null;
}

export default function StayList({ stays, loading, error }: StayListProps) {
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  const handleReserveClick = (stay: Stay) => {
    setSelectedStay(stay);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-56 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Oops! Algo deu errado.
        </h3>
        <p className="text-gray-600">
          {error} Por favor, tente recarregar a página.
        </p>
      </div>
    );
  }

  if (!stays || stays.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Nenhuma hospedagem encontrada
        </h3>
        <p className="text-gray-600">
          Não encontramos nenhuma hospedagem disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stays.map((stay) => (
          <StayCard
            key={stay.id}
            stay={stay}
            onReserveClick={handleReserveClick}
          />
        ))}
      </div>

      {selectedStay && (
        <ReservationModal
          stay={selectedStay}
          isOpen={!!selectedStay}
          onClose={() => setSelectedStay(null)}
        />
      )}
    </>
  );
}
