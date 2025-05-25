import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, isAuthenticated, checkAuth } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      onClose();
    }
  }, [isOpen, isAuthenticated, onClose]);

  const validateForm = () => {
    if (isRegister && !formData.name.trim()) {
      setError("Digite seu nome para continuar");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Digite seu e-mail para continuar");
      return false;
    }
    if (!formData.password) {
      setError("Digite sua senha para continuar");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await authService.register(
          formData.name,
          formData.email,
          formData.password
        );
        const loginSuccessful = await login(formData.email, formData.password);
        if (loginSuccessful) {
          onClose();
        } else {
          setError("Conta criada! Faça login para continuar.");
        }
      } else {
        await login(formData.email, formData.password);
        onClose();
      }
    } catch (err: any) {
      console.error("Erro no formulário de autenticação (LoginModal):", err);
      if (err && err.message) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1A1B4B]">
            {isRegister ? "Criar Conta" : "Entrar"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                value={formData.name}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, name: e.target.value });
                }}
                placeholder="Digite seu nome completo"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              value={formData.email}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, email: e.target.value });
              }}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              value={formData.password}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, password: e.target.value });
              }}
              placeholder={isRegister ? "Crie uma senha forte" : "Digite sua senha"}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B6B] text-white py-2.5 rounded-lg font-medium hover:bg-[#FF5252] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Processando..."
              ) : isRegister ? (
                "Criar Conta"
              ) : (
                "Entrar"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                setFormData({ name: "", email: "", password: "" });
                setIsRegister(!isRegister);
              }}
              className="text-[#FF6B6B] hover:text-[#FF5252] text-sm font-medium"
            >
              {isRegister
                ? "Já tem uma conta? Entre aqui"
                : "Não tem uma conta? Registre-se"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
