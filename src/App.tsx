import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StayList from "./components/StayList";
import LoginModal from "./components/LoginModal";
import { PrivateRoute } from "./components/PrivateRoute";
import MyReservationsPage from "./pages/MyReservationsPage";
import { useAuth } from "./contexts/AuthContext";
import type { Stay } from "./components/types";
import { stayService } from "./services/api";

const AppRoutes: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [stays, setStays] = useState<Stay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { checkAuth, isLoading: isLoadingAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        setLoading(true);
        const data = await stayService.listStays();
        setStays(data || []);
      } catch (err: any) {
        setError(err.message || "Falha ao carregar hospedagens");
      } finally {
        setLoading(false);
      }
    };
    fetchStays();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchTerm.trim() === "" || searchTerm.toLowerCase() === "todos") {
        data = await stayService.listStays();
      } else {
        data = await stayService.searchStaysByLocation(searchTerm);
      }
      setStays(data || []);
      if (!data || data.length === 0) {
        setError(searchTerm.trim() === "" || searchTerm.toLowerCase() === "todos" ? "Nenhuma hospedagem encontrada." : `Nenhuma hospedagem encontrada para "${searchTerm}".`);
      }
    } catch (err: any) {
      setError(err.message || "Falha ao buscar hospedagens.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Carregando aplicação...</p>
      </div>
    );
  }

  // JSX para a Hero Section
  const heroSection = (
    <div className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Encontre sua <span className="text-[#FF6B6B]">estadia perfeita</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Descubra e reserve acomodações incríveis para sua próxima aventura. Conforto, localização e o melhor preço, tudo em um só lugar.
        </p>
        <div className="mt-10">
          <a 
            href="#stay-list" //  Para rolar para a lista de hospedagens
            className="inline-block bg-[#FF6B6B] hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform duration-150 ease-in-out hover:scale-105"
          >
            Explorar Hospedagens
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar onLoginClick={() => setShowLoginModal(true)} onSearch={handleSearch} />
      
      {/* Renderiza a Hero Section apenas na rota principal "/" */}
      <Routes>
        <Route path="/" element={
          <>
            {heroSection} 
            <main id="stay-list" className="flex-grow container mx-auto px-4 py-12">
              <StayList stays={stays} loading={loading} error={error} />
            </main>
          </>
        }/>
        <Route
          path="/my-reservations"
          element={
            <PrivateRoute>
              <main className="flex-grow container mx-auto px-4 py-12">
                 <MyReservationsPage />
              </main>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Footer />
      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}
    </div>
  );
};

export default AppRoutes;
