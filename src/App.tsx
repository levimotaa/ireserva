import React, { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import StayList from "./components/StayList";
import LoginModal from "./components/LoginModal";
import ContatoModal from "./components/ContatoModal";
import Footer from "./components/Footer";
import { stayService } from "./services/api";
import type { Stay } from "./components/types";

export default function App() {
  // Estados
  const [stays, setStays] = useState<Stay[]>([]);
  const [search, setSearch] = useState({
    destino: "",
    checkin: "",
    checkout: "",
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showContato, setShowContato] = useState(false);
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carregar hospedagens ao iniciar
  useEffect(() => {
    loadStays();
  }, []);

  // Função para carregar hospedagens
  const loadStays = async () => {
    try {
      setLoading(true);
      const data = await stayService.listStays();
      setStays(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar hospedagens");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers otimizados
  const handleSearch = useCallback(async (filtros: typeof search) => {
    setSearch(filtros);
    try {
      setLoading(true);
      if (filtros.destino) {
        const data = await stayService.searchStaysByLocation(filtros.destino);
        setStays(data);
      } else {
        const data = await stayService.listStays();
        setStays(data);
      }
      setError("");
    } catch (err) {
      setError("Erro ao buscar hospedagens");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = useCallback(() => {
    setShowLogin(true);
  }, []);

  const handleLoginSuccess = useCallback((email: string) => {
    setUser(email);
    localStorage.setItem('user', email);
    setShowLogin(false);
  }, []);

  const handleShowContato = useCallback(() => setShowContato(true), []);
  const handleCloseContato = useCallback(() => setShowContato(false), []);

  // Hero Section com título e descrição
  const heroSection = (
    <div className="relative overflow-hidden">
      {/* Background com efeito de gradiente */}
      <div className="absolute inset-0 bg-[#1A1B4B]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-5"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative max-w-screen-2xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Reserve sua <span className="text-[#FF6B6B]">Hospedagem</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 animate-fade-in delay-100">
            Encontre o lugar perfeito para sua próxima viagem
          </p>
        </div>
        <div className="max-w-4xl mx-auto animate-slide-up delay-200">
          <SearchBar onSearch={handleSearch} initialValues={search} />
        </div>
      </div>

      {/* Decoração */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F9FB] to-transparent"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] w-full">
      <Navbar
        onLogin={handleLogin}
        onContato={handleShowContato}
        user={user}
      />
      {heroSection}
      
      <main className="max-w-screen-2xl mx-auto px-4 py-16">
        {/* Seção de Destaques */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1A1B4B] mb-2">
                Hospedagens em Destaque
              </h2>
              <p className="text-gray-600">
                Selecionamos as melhores opções para sua estadia
              </p>
            </div>
          </div>
          
          {error && (
            <div className="text-red-600 mb-4 text-center">{error}</div>
          )}
          
          {loading ? (
            <div className="text-center py-8">Carregando hospedagens...</div>
          ) : (
            <StayList stays={stays} />
          )}
        </div>

        {/* Seção de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-gray-200">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#7047EB]/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-[#7047EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#23244C] mb-3">Reservas Seguras</h3>
            <p className="text-gray-600">Garantimos a segurança de todas as suas reservas e pagamentos</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#7047EB]/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-[#7047EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#23244C] mb-3">Reserva Instantânea</h3>
            <p className="text-gray-600">Confirmação imediata sem necessidade de espera</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-6 bg-[#7047EB]/10 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-[#7047EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#23244C] mb-3">Suporte 24/7</h3>
            <p className="text-gray-600">Atendimento disponível a qualquer momento</p>
          </div>
        </div>
      </main>

      <Footer />

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <ContatoModal
        open={showContato}
        onClose={handleCloseContato}
      />
    </div>
  );
}
