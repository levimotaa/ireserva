import { Routes, Route } from 'react-router-dom';
import App from './App';
import { PrivateRoute } from './components/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<App />} />
      
      {/* Rotas privadas (exemplo) */}
      <Route
        path="/reservas"
        element={
          <PrivateRoute>
            <div>Página de Reservas</div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
} 