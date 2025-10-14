import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import WelcomeLabs from "./pages/WelcomeLabs";

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para redirigir si ya está autenticado
const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <WelcomeLabs />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
