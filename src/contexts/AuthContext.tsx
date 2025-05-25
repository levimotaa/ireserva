import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para verificar e atualizar o estado de autenticação
  const checkAuth = useCallback(async () => {
    console.log("AuthContext: checkAuth chamado");
    setIsLoading(true); // Iniciar o carregamento ao verificar
    try {
      const authenticated = authService.isAuthenticated();
      console.log("AuthContext: isAuthenticated resultado:", authenticated);
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const currentUser = authService.getCurrentUser();
        console.log("AuthContext: currentUser:", currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
      console.log("AuthContext: checkAuth finalizado, isLoading:", false);
    }
  }, []); // useCallback para estabilizar a função

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Verificar autenticação quando o localStorage mudar
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("AuthContext: storage event detectado, chamando checkAuth");
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response.user) {
        await checkAuth(); // Atualiza o estado após o login
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      // Aqui você pode querer lançar o erro ou retornar uma mensagem de erro específica
      // que pode ser pega pelo LoginModal
      throw error; // Propagar o erro para o LoginModal tratar
    }
  };

  const logout = () => {
    try {
      authService.logout();
      // Não precisa chamar checkAuth aqui, pois o estado é definido diretamente
      setIsAuthenticated(false);
      setUser(null);
      console.log("AuthContext: Usuário deslogado");
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuth, isLoading }}>
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