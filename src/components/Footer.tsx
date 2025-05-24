import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1B4B] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              i<span className="text-[#FF6B6B]">Reserva</span>
            </h2>
            <p className="text-gray-300 max-w-md">
              Encontre as melhores hospedagens para sua próxima viagem. 
              Hotéis, pousadas e resorts selecionados para sua melhor experiência.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#FF6B6B] transition-colors">
                  Torne-se um Parceiro
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                contato@ireserva.com
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                (11) 9999-9999
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 iReserva. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#FF6B6B] transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B6B] transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 