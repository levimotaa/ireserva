import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: any;
}

class AuthService {
  private static TOKEN_KEY = '@iReserva:token';
  private static USER_KEY = '@iReserva:user';

  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem(AuthService.TOKEN_KEY, response.data.token);
        localStorage.setItem(AuthService.USER_KEY, JSON.stringify(response.data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // No frontend, vamos apenas verificar se existe um token
    // A validação real será feita pelo backend em cada requisição
    return true;
  }
}

export const authService = new AuthService(); 