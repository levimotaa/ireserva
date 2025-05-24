import React, { useState } from "react";
import { authService } from "../services/api";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error("Todos os campos são obrigatórios");
        }
        const response = await authService.register(
          formData.name,
          formData.email,
          formData.password
        );
        if (response.user) {
          onLoginSuccess(response.user.email);
          onClose();
        }
      } else {
        if (!formData.email || !formData.password) {
          throw new Error("Email e senha são obrigatórios");
        }
        const response = await authService.login(
          formData.email,
          formData.password
        );
        if (response.user) {
          onLoginSuccess(response.user.email);
          onClose();
        }
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      setError(error.message || "Erro ao processar requisição");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => {
                  setError("");
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.password}
              onChange={(e) => {
                setError("");
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Processando..." : (isRegister ? "Criar Conta" : "Entrar")}
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                setFormData({ name: "", email: "", password: "" });
                setIsRegister(!isRegister);
              }}
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              {isRegister
                ? "Já tem uma conta? Entre aqui"
                : "Não tem uma conta? Registre-se"}
            </button>

            <button
              type="button"
              onClick={() => {
                setError("");
                onClose();
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
