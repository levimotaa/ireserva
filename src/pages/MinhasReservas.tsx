import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/api';

interface Reservation {
    id: number;
    check_in_date: string;
    check_out_date: string;
    total_price: number;
    status: string;
    title: string;
    location: string;
    img_url: string;
}

export default function MinhasReservas() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadReservations();
    }, []);

    const loadReservations = async () => {
        try {
            setLoading(true);
            const data = await reservationService.getMyReservations();
            setReservations(data);
        } catch (err: any) {
            setError(err.message || 'Erro ao carregar reservas');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (id: number) => {
        try {
            await reservationService.cancelReservation(id);
            await loadReservations(); // Recarregar a lista
        } catch (err: any) {
            setError(err.message || 'Erro ao cancelar reserva');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        Carregando suas reservas...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-[#1A1B4B] mb-8">
                    Minhas Reservas
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {reservations.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <div className="text-gray-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#1A1B4B] mb-2">
                            Você ainda não tem reservas
                        </h3>
                        <p className="text-gray-600">
                            Que tal explorar nossas opções de hospedagem?
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {reservations.map((reservation) => (
                            <div
                                key={reservation.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/4">
                                        <img
                                            src={reservation.img_url}
                                            alt={reservation.title}
                                            className="w-full h-48 md:h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#1A1B4B] mb-2">
                                                    {reservation.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    {reservation.location}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                reservation.status === 'confirmada'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {reservation.status === 'confirmada' ? 'Confirmada' : 'Cancelada'}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <span className="block text-sm text-gray-600">Check-in</span>
                                                <span className="text-[#1A1B4B] font-medium">
                                                    {new Date(reservation.check_in_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-sm text-gray-600">Check-out</span>
                                                <span className="text-[#1A1B4B] font-medium">
                                                    {new Date(reservation.check_out_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-sm text-gray-600">Valor Total</span>
                                                <span className="text-[#1A1B4B] font-medium">
                                                    R$ {reservation.total_price}
                                                </span>
                                            </div>
                                        </div>

                                        {reservation.status === 'confirmada' && (
                                            <button
                                                onClick={() => handleCancelReservation(reservation.id)}
                                                className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                                            >
                                                Cancelar Reserva
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 