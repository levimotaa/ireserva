import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/api';
import type { MyReservation } from '../components/types';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const MyReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<MyReservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Para garantir que o usuário está logado e obter ID se necessário

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const data = await reservationService.getMyReservations();
        setReservations(data);
        setError(null);
      } catch (err: any) {
        console.error("Erro ao buscar minhas reservas:", err);
        setError(err.message || 'Falha ao carregar suas reservas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Só busca se o usuário estiver logado
      fetchReservations();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-700">Carregando suas reservas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-red-600">{error}</p>
        <Link to="/" className="mt-4 inline-block bg-[#FF6B6B] text-white py-2 px-4 rounded hover:bg-[#E05A5A]">
          Voltar para Home
        </Link>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Minhas Reservas</h1>
        <p className="text-xl text-gray-700">Você ainda não fez nenhuma reserva.</p>
        <Link to="/" className="mt-6 inline-block bg-[#FF6B6B] text-white py-3 px-6 rounded-lg hover:bg-[#E05A5A] text-lg font-medium">
          Encontrar Hospedagens
        </Link>
      </div>
    );
  }

  // Função para formatar data (ex: DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };    
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Minhas Reservas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="relative aspect-[16/9]">
              <img 
                src={reservation.img_url.startsWith('http') ? reservation.img_url : `http://localhost:3000${reservation.img_url}`}
                alt={reservation.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{reservation.title}</h2>
              <p className="text-gray-600 text-sm mb-1">{reservation.location}</p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Check-in:</span> {formatDate(reservation.check_in_date)}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Check-out:</span> {formatDate(reservation.check_out_date)}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Hóspedes:</span> {reservation.guests}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Status:</span> 
                <span className={`ml-2 px-2 py-0.5 rounded-full text-sm font-medium 
                  ${reservation.status === 'confirmada' ? 'bg-green-100 text-green-700' : 
                    reservation.status === 'cancelada' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
                  `}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </span>
              </p>
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="text-xl font-bold text-gray-900">
                  Total: R$ {parseFloat(reservation.total_price).toFixed(2).replace('.', ',')}
                </p>
              </div>
              {/* Futuramente, aqui pode ter um botão para cancelar a reserva, se aplicável */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservationsPage; 