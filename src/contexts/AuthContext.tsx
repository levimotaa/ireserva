import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, LoginCredentials } from '../services/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica o estado de autenticação ao carregar a aplicação
    const checkAuth = async () => {
      try {
        const authenticated = authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          setUser(authService.getCurrentUser());
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const success = await authService.login(credentials);
      if (success) {
        setIsAuthenticated(true);
        setUser(authService.getCurrentUser());
      }
      return success;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  if (isLoading) {
    return null; // ou um componente de loading
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
} 