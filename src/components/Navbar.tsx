import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

type Props = {
  onLoginClick: () => void;
  onSearch: (searchTerm: string) => void;
};

export default function Navbar({ onLoginClick, onSearch }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [navbarBg, setNavbarBg] = useState('bg-slate-900');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        if (window.scrollY > 50) {
          setNavbarBg('bg-slate-900 shadow-lg');
        } else {
          setNavbarBg('bg-slate-900');
        }
      } else {
        setNavbarBg('bg-slate-900 shadow-lg');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`text-white fixed w-full top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${navbarBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Seção Esquerda: Links de navegação (ex: Minhas Reservas) */}
            <div className="hidden md:flex items-center space-x-4 flex-1">
              {isAuthenticated && (
                <Link 
                  to="/my-reservations" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-opacity-50 transition-colors"
                >
                  Minhas Reservas
                </Link>
              )}
              {/* Outros links à esquerda podem ser adicionados aqui */}
            </div>

            {/* Logo Centralizado - apenas Desktop */}
            <div className="hidden md:flex flex-shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-white">
                  i<span className="text-[#FF6B6B]">Reserva</span>
                </span>
              </Link>
            </div>
            
            {/* Logo para Mobile - alinhado à esquerda */}
            <div className="flex md:hidden flex-1">
                <Link to="/" className="flex-shrink-0">
                    <span className="text-2xl font-bold text-white">
                    i<span className="text-[#FF6B6B]">Reserva</span>
                    </span>
                </Link>
            </div>

            {/* Seção Direita: Botão Login/User Menu - Desktop */}
            <div className="hidden md:flex flex-1 items-center justify-end">
              {isAuthenticated ? (
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all"
                    id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                  >
                    <span className="sr-only">Abrir menu do usuário</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </button>
                  {showUserMenu && (
                    <div 
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}
                    >
                      <Link
                        to="/my-reservations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hidden" // Esconder este link específico no dropdown se já visível na navbar
                        role="menuitem" tabIndex={-1} onClick={() => setShowUserMenu(false)}
                      >
                        Minhas Reservas
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem" tabIndex={-1}
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#E05A5A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#FF6B6B] transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>

            {/* Botão Menu - Mobile (garante que fique à direita do logo mobile) */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className={`hover:text-white inline-flex items-center justify-center p-2 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`} 
                aria-controls="mobile-menu" aria-expanded="false"
              >
                <span className="sr-only">Abrir menu principal</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */} 
        {isMobileMenuOpen && (
          <div className={`md:hidden fixed inset-x-0 top-16 z-40 sm:px-2 lg:px-3 shadow-lg`} id="mobile-menu">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 rounded-b-lg`}>
              {isAuthenticated && (
                 <Link to="/my-reservations" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                   Minhas Reservas
                 </Link>
              )}
            </div>
            <div className={`pt-4 pb-3 border-t border-gray-700 bg-slate-900`}>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                       <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                         {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                       </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user?.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Espaçador para o conteúdo não ficar sob a navbar fixa (h-16 corresponde à altura da navbar) */}
      <div className="h-16" />
    </>
  );
}
