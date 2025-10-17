# Notion Embedded - API Solution

Este proyecto implementa una aplicación Next.js con autenticación JWT y contenido de Notion usando la **API oficial de Notion**, garantizando que la URL esté completamente oculta.

## Características

- ✅ Autenticación JWT
- ✅ Login con usuarios mock
- ✅ Contenido de Notion usando API oficial
- ✅ **URL completamente oculta** (sin iframe)
- ✅ Renderizado personalizado del contenido
- ✅ Autenticación completa

## Tecnologías

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Notion**: API oficial (@notionhq/client)
- **Autenticación**: JWT (jsonwebtoken)
- **Estilos**: Tailwind CSS

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```bash
cp .env.example .env.local
```

3. Configurar integración de Notion (ver `NOTION_API_SETUP.md`)

4. Ejecutar en desarrollo:

```bash
npm run dev
```

## Usuarios de Prueba

- `admin / admin123`
- `user / user123`
- `demo / demo123`

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/login/              # Endpoint de login
│   │   └── notion/
│   │       └── api-content/         # API de Notion
│   ├── login/                       # Página de login
│   ├── welcome/                     # Página de bienvenida
│   └── layout.tsx                   # Layout principal
├── components/
│   ├── LoginForm.tsx                # Formulario de login
│   └── NotionAPIEmbed.tsx           # Componente con API de Notion
├── contexts/
│   └── AuthContext.tsx              # Context de autenticación
└── lib/
    └── auth.ts                      # Funciones de autenticación
```

## Variables de Entorno

```env
JWT_SECRET=mi_super_secreto_jwt_para_notion_embedded_2024
NOTION_API_KEY=secret_tu_integration_token_aqui
NOTION_PAGE_ID=28be9e2e2a388084842ff409d5ee27fd
```

## Configuración de Notion

Para configurar la integración con Notion, sigue las instrucciones detalladas en `NOTION_API_SETUP.md`.

**Pasos rápidos:**

1. Crear integración en [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Copiar el token de integración
3. Compartir la página de Notion con la integración
4. Configurar las variables de entorno

## Desarrollo

Para desarrollo local:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Producción

Para construir para producción:

```bash
npm run build
npm start
```

## Ventajas de esta Solución

- **✅ URL completamente oculta** - No hay iframe, todo se renderiza en tu servidor
- **✅ Contenido real de Notion** - Obtienes el contenido directamente de Notion
- **✅ Autenticación completa** - Control total sobre quién accede
- **✅ Personalización total** - Puedes diseñar la interfaz como quieras
- **✅ Rendimiento controlado** - No depende de la velocidad de Notion

## Limitaciones

- **⚠️ Solo contenido estático** - No tendrás las funciones interactivas de Notion
- **⚠️ Sin edición en tiempo real** - Los usuarios no podrán editar directamente
- **⚠️ Sin colaboración** - No habrá comentarios, sugerencias, etc.
