"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay usuario guardado en localStorage
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log("🔐 Intentando login con:", { username });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log(
        "📡 Respuesta del servidor:",
        response.status,
        response.statusText
      );

      const data = await response.json();
      console.log("📦 Datos recibidos:", data);

      if (data.success && data.token) {
        const userData = data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        console.log("✅ Login exitoso");
        return { success: true };
      } else {
        console.log("❌ Login falló:", data.error);
        return {
          success: false,
          error: data.error || "Error de autenticación",
        };
      }
    } catch (error) {
      console.error("💥 Login error:", error);
      return { success: false, error: "Error de conexión" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
