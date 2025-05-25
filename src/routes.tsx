import { Routes, Route } from 'react-router-dom';
import App from './App';
import { PrivateRoute } from './components/PrivateRoute';
import MinhasReservas from './pages/MinhasReservas';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<App />} />
      
      {/* Rotas privadas */}
      <Route
        path="/minhas-reservas"
        element={
          <PrivateRoute>
            <MinhasReservas />
          </PrivateRoute>
        }
      />
    </Routes>
  );
} 