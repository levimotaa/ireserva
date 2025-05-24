import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import { authService } from '../services/api';

type Props = {
  onLogin: () => void;
  onContato: () => void;
  user: string | null;
};

export default function Navbar({ onLogin, onContato, user }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    authService.logout();
    window.location.reload(); // Recarrega a página para limpar o estado
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed w-full top-0 left-0 right-0 h-16 bg-[#1A1B4B] z-50">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <span className="text-2xl font-bold text-white">
              i<span className="text-[#FF6B6B]">Reserva</span>
            </span>

            {/* Links - Apenas Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] tracking-wide">
                Início
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] tracking-wide">
                Buscar
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] tracking-wide">
                Favoritos
              </a>
              <button onClick={onContato} className="text-gray-300 hover:text-white transition-colors text-[15px] tracking-wide">
                Contato
              </button>
            </div>

            {/* Botão Login - Desktop */}
            <div className="hidden lg:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-white hover:text-[#FF5252] transition"
                  >
                    <span>{user}</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#2A2B5B] rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#FF5252] transition-all duration-200 font-medium text-[15px] hover:shadow-lg hover:shadow-[#FF6B6B]/20"
                >
                  Entrar
                </button>
              )}
            </div>

            {/* Botão Menu - Mobile */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogin={onLogin}
        onContato={onContato}
      />

      {/* Espaçador */}
      <div className="h-16" />
    </>
  );
}
