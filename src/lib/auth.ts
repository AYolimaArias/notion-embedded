import jwt from "jsonwebtoken";

// Mock users database (en producción usarías una BD real)
const MOCK_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123", // Simplificado para testing
    email: "admin@example.com",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    email: "user@example.com",
  },
  {
    id: 3,
    username: "demo",
    password: "demo123",
    email: "demo@example.com",
  },
];

export interface User {
  id: number;
  username: string;
  email: string;
}

// Función para generar JWT token
export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );
};

// Función para verificar JWT token
export const verifyToken = (token: string): User => {
  return jwt.verify(token, process.env.JWT_SECRET!) as User;
};

// Función para verificar credenciales
export const verifyCredentials = (username: string, password: string) => {
  const user = MOCK_USERS.find((u) => u.username === username);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  // Comparación directa para testing
  if (user.password !== password) {
    return { success: false, error: "Invalid password" };
  }

  return {
    success: true,
    user: { id: user.id, username: user.username, email: user.email },
  };
};

export { MOCK_USERS };
