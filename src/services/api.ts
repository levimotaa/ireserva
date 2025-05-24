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
        console.error('Erro na requisição:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error.response?.data || { message: 'Erro ao processar requisição' });
    }
);

export const authService = {
    async register(name: string, email: string, password: string) {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { user };
        } catch (error: any) {
            console.error('Erro no registro:', error);
            throw new Error(error.response?.data?.message || 'Falha no registro');
        }
    },

    async login(email: string, password: string) {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { user };
        } catch (error: any) {
            console.error('Erro no login:', error);
            throw new Error(error.response?.data?.message || 'Falha na autenticação');
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
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
            const response = await api.get('/stays');
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

export default api; 