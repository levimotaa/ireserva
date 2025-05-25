import React, { useState } from 'react';
import type { Stay } from './types';
import { useAuth } from '../contexts/AuthContext';
import { reservationService } from '../services/api';

interface Props {
  stay: Stay;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ stay, isOpen, onClose }: Props) {
  const { isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!isAuthenticated) {
      setError('Você precisa estar logado para fazer uma reserva.');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Por favor, selecione as datas de check-in e check-out.');
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      setError('A data de check-out deve ser posterior à data de check-in.');
      return;
    }
    if (new Date(checkIn) < new Date(new Date().setHours(0,0,0,0))) {
        setError('A data de check-in não pode ser anterior à data atual.');
        return;
    }

    setIsLoading(true);

    try {
      const response = await reservationService.createReservation(
        stay.id,
        checkIn,
        checkOut,
        guests
      );
      
      console.log('Reserva criada:', response); 
      setSuccessMessage('Reserva realizada com sucesso!'); 
      // Fechar o modal após um pequeno delay para o usuário ver a mensagem de sucesso
      setTimeout(() => {
        onClose();
        setSuccessMessage(''); // Limpar mensagem de sucesso ao fechar
      }, 2000); 

    } catch (err: any) {
      console.error("Erro ao criar reserva no modal:", err);
      if (err && err.message) {
        setError(err.message);
      } else {
        setError('Não foi possível concluir a reserva. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Fazer Reserva</h2>
          <button
            onClick={() => {
              onClose();
              setError(''); // Limpar erros ao fechar manualmente
              setSuccessMessage(''); // Limpar sucesso ao fechar manualmente
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900">{stay.title}</h3>
          <p className="text-gray-600 text-sm">{stay.location}</p>
          <div className="mt-2">
            <span className="text-lg font-semibold text-gray-900">
              R$ {stay.price}
            </span>
            <span className="text-gray-600 text-sm">/{stay.priceType}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="check-in"
                className="block text-sm font-medium text-gray-700"
              >
                Check-in
              </label>
              <input
                type="date"
                id="check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="check-out"
                className="block text-sm font-medium text-gray-700"
              >
                Check-out
              </label>
              <input
                type="date"
                id="check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700"
              >
                Número de hóspedes
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              >
                {Array.from({ length: stay.maxGuests }, (_, i) => i + 1).map(
                  (num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'hóspede' : 'hóspedes'}
                    </option>
                  )
                )}
              </select>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg mt-2">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="text-green-600 text-sm p-3 bg-green-50 rounded-lg mt-2">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !!successMessage} // Desabilitar se estiver carregando ou se houver mensagem de sucesso
              className="w-full bg-[#FF6B6B] text-white py-2 px-4 rounded-lg hover:bg-[#E05A5A] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processando...' : (successMessage ? 'Reservado!' : 'Confirmar Reserva')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 