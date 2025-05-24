import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: string | null;
  onLogin: () => void;
  onContato: () => void;
};

export default function MobileMenu({ isOpen, onClose, user, onLogin, onContato }: Props) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-[#1A1B4B]">
                            iReserva            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Usuário */}
          <div className="mb-8">
            {user ? (
              <div className="flex items-center space-x-3 p-3 bg-[#F5F6FA] rounded-lg">
                <div className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{user[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bem-vindo,</p>
                  <p className="font-medium text-[#1A1B4B]">{user}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-lg font-medium hover:bg-[#FF5252] transition-colors"
              >
                Entrar
              </button>
            )}
          </div>

          {/* Links */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 p-3 text-[#1A1B4B] hover:bg-[#F5F6FA] rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>Início</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 text-[#1A1B4B] hover:bg-[#F5F6FA] rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span>Buscar</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 text-[#1A1B4B] hover:bg-[#F5F6FA] rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>Favoritos</span>
            </a>
            <button
              onClick={onContato}
              className="flex w-full items-center space-x-3 p-3 text-[#1A1B4B] hover:bg-[#F5F6FA] rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Contato</span>
            </button>
          </nav>
        </div>

        {/* Footer do Menu */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <p className="text-sm text-gray-500 text-center">
            &copy; 2025 iReserva
          </p>
        </div>
      </div>
    </>
  );
} 