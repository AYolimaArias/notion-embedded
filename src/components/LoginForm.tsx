"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Formulario enviado con:", { username, password });

    setError("");
    setIsLoading(true);

    try {
      const result = await login(username, password);
      console.log("📝 Resultado del login:", result);

      if (result.success) {
        console.log("✅ Login exitoso, redirigiendo...");
        router.push("/welcome");
      } else {
        console.log("❌ Login falló:", result.error);
        setError(result.error || "Error de autenticación");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("💥 Error en handleSubmit:", err);
      setError("Error de conexión");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Codeable Labs
          </h1>
          <p className="text-gray-600">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">💡 Usuarios de prueba:</p>
          <ul className="text-xs space-y-1">
            <li>
              <code className="bg-gray-200 px-2 py-1 rounded">
                admin / admin123
              </code>
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-1 rounded">
                user / user123
              </code>
            </li>
            <li>
              <code className="bg-gray-200 px-2 py-1 rounded">
                demo / demo123
              </code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
