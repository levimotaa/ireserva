import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor para tratar erros
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Erro na requisição (Interceptor):', {
            status: error.response?.status,
            data: error.response?.data,
            config: {
                method: error.config?.method,
                url: error.config?.url,
                params: error.config?.params,
                data: error.config?.data
            },
            isAxiosError: error.isAxiosError,
            errorMessage: error.message,
            originalError: error // Adicionando o erro original para depuração se necessário
        });

        if (error.response?.status === 401) {
            console.warn('Interceptor: Recebido erro 401. O erro original será propagado.');
        }
        // Propagar o objeto de erro original do Axios
        return Promise.reject(error);
    }
);

export const authService = {
    async register(name: string, email: string, password: string) {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { user };
        } catch (error: any) { 
            console.error('Objeto de erro recebido no catch de authService.register:', error);
            // Agora 'error' é o objeto de erro completo do Axios
            if (error.response && error.response.data && typeof error.response.data.message === 'string' && error.response.data.message.toLowerCase().includes('email já cadastrado')) {
                throw new Error('Email ja está cadastrado.');
            }
            // Para outros erros durante o registro
            throw new Error(error.response?.data?.message || 'Não foi possível criar sua conta. Verifique suas informações e tente novamente.');
        }
    },

    async login(email: string, password: string) {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { user };
        } catch (error: any) {
            console.error('Erro no login:', error);
            if (error.response?.status === 401) {
                throw new Error('E-mail ou senha incorretos');
            }
            throw new Error('Não foi possível fazer login. Verifique suas credenciais.');
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                return user;
            } catch {
                this.logout();
                return null;
            }
        }
        return null;
    },

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = this.getCurrentUser();
        return !!(token && user);
    }
};

export const stayService = {
    async listStays() {
        try {
            console.log('Fazendo requisição para listar hospedagens...');
            const response = await api.get('/stays');
            console.log('Resposta recebida:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar hospedagens:', error);
            throw new Error('Falha ao carregar hospedagens');
        }
    },

    getStayById: async (id: number) => {
        try {
            const response = await api.get(`/stays/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar hospedagem:', error);
            throw error;
        }
    },

    async searchStaysByLocation(location: string) {
        try {
            const response = await api.get(`/stays/search/${encodeURIComponent(location)}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar hospedagens:', error);
            throw new Error('Falha ao buscar hospedagens');
        }
    }
};

export const reservationService = {
    async createReservation(stayId: number, checkIn: string, checkOut: string, guests: number) {
        try {
            const response = await api.post('/reservations', { stay_id: stayId, check_in_date: checkIn, check_out_date: checkOut, guests });
            return response.data;
        } catch (error: any) {
            console.error('Erro detalhado ao criar reserva (api.ts):', error.response);
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else if (error.response && error.response.status) {
                throw new Error(`Erro ${error.response.status}: Falha na comunicação com o servidor ao tentar criar reserva.`);
            } else {
                throw new Error('Falha ao criar reserva. Verifique sua conexão ou tente mais tarde.');
            }
        }
    },

    async getMyReservations() {
        try {
            const response = await api.get('/reservations/my-reservations');
            return response.data;
        } catch (error: any) {
            console.error('Erro ao buscar reservas:', error);
            throw new Error(error.response?.data?.message || 'Falha ao buscar reservas');
        }
    },

    async cancelReservation(reservationId: number) {
        try {
            const response = await api.post(`/reservations/${reservationId}/cancel`);
            return response.data;
        } catch (error: any) {
            console.error('Erro ao cancelar reserva:', error);
            throw new Error(error.response?.data?.message || 'Falha ao cancelar reserva');
        }
    },

    async checkAvailability(stayId: number, checkIn: string, checkOut: string) {
        try {
            if (!checkIn || !checkOut) {
                throw new Error('Datas de check-in e check-out são obrigatórias');
            }

            // Validações de data
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
                throw new Error('Datas inválidas');
            }

            if (checkInDate >= checkOutDate) {
                throw new Error('A data de check-out deve ser posterior à data de check-in');
            }

            if (checkInDate < today) {
                throw new Error('A data de check-in não pode ser anterior à data atual');
            }

            console.log('Enviando requisição de disponibilidade:', {
                stayId,
                checkIn,
                checkOut
            });

            const response = await api.get(`/availability/${stayId}`, {
                params: {
                    check_in_date: checkIn,
                    check_out_date: checkOut
                }
            });

            console.log('Resposta da verificação:', response.data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            return {
                available: response.data.available,
                message: response.data.message
            };
        } catch (error: any) {
            console.error('Erro ao verificar disponibilidade:', error);
            throw {
                message: error.response?.data?.message || error.message || 'Erro ao verificar disponibilidade',
                error: error.response?.data || error,
                type: error.response?.status === 400 ? 'validation' : 'server'
            };
        }
    }
};

export default api; 