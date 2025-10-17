"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import "@/styles/notion.css";

interface NotionBlock {
  type: string;
  [key: string]: any;
}

interface NotionContent {
  page: any;
  blocks: NotionBlock[];
  title: string;
  renderedContent: string;
}

export default function NotionAPIEmbed() {
  const { user } = useAuth();
  const [content, setContent] = useState<NotionContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchNotionContent();
    }
  }, [user]);

  const fetchNotionContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró el token de autenticación");
        return;
      }

      const response = await fetch(
        `/api/notion/api-content?token=${encodeURIComponent(token)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al cargar el contenido");
        return;
      }

      const data = await response.json();
      console.log("📦 Datos completos de la API:", data);
      console.log("📝 Título extraído:", data.content?.title);
      console.log("📄 Contenido completo:", data.content);
      setContent(data.content);
    } catch (err) {
      console.error("Error fetching Notion content:", err);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // Si no hay usuario autenticado, mostrar mensaje
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Autenticación Requerida
          </h3>
          <p className="text-gray-600">
            Debes iniciar sesión para ver el contenido de Notion.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <h1 className="text-2xl font-bold">Welcome Labs</h1>
              <p className="text-blue-100">Bienvenido, {user.username}</p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center h-[600px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">
                    Cargando contenido desde Notion API...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4">
              <h1 className="text-2xl font-bold">Error</h1>
              <p className="text-red-100">Bienvenido, {user.username}</p>
            </div>

            <div className="p-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <h3 className="font-semibold mb-2">
                  Error al cargar el contenido:
                </h3>
                <p>{error}</p>
                <button
                  onClick={fetchNotionContent}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Debug log
  console.log("🔍 Renderizando título:", content?.title);

  const handleLogout = () => {
    const { logout } = useAuth();
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header/Navbar */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome Labs</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <span className="text-lg">Hola, {user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg border border-white/30 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Notion Content with Internal Scroll */}
          <div className="notion-container-scroll">
            {/* Page Title */}
            {content?.title && (
              <div className="notion-page-title">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                  {content.title}
                </h1>
              </div>
            )}

            {/* Page Content */}
            <div
              className="notion-content"
              dangerouslySetInnerHTML={{
                __html: content?.renderedContent || "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
