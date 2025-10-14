import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Datos mockeados de usuarios
const MOCK_USERS = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "user123" },
  { username: "demo", password: "demo123" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // Buscar usuario en los datos mockeados
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = { username: foundUser.username };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Usuario o contraseña incorrectos" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
