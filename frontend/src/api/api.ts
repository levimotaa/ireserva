import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const checkAvailability = async (stayId: number, checkIn: string, checkOut: string) => {
    try {
        console.log('Enviando requisição de disponibilidade:', {
            stayId,
            checkIn,
            checkInDate: new Date(checkIn).toISOString(),
            checkOut,
            checkOutDate: new Date(checkOut).toISOString()
        });

        const response = await api.get(`/reservations/check/${stayId}`, {
            params: {
                check_in_date: checkIn,
                check_out_date: checkOut
            }
        });

        console.log('Resposta da verificação:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Erro na requisição:', error);
        if (error.response) {
            console.error('Detalhes do erro:', {
                status: error.response.status,
                data: error.response.data
            });
        }
        throw {
            message: error.response?.data?.message || 'Erro ao verificar disponibilidade',
            error: error.response?.data || error.message,
            type: error.response?.status === 400 ? 'validation' : 'server'
        };
    }
}; 