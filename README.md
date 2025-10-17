# Notion Embedded - Codeable Labs

Una aplicación Next.js que integra contenido de Notion de forma segura y con autenticación, ocultando completamente la URL original de Notion.

## 🚀 Características Principales

- **🔒 Autenticación JWT**: Sistema de login seguro con tokens JWT
- **📄 Contenido de Notion**: Integración completa con la API oficial de Notion
- **🎨 UI Auténtica**: Interfaz que replica la experiencia de Notion
- **🔐 URL Ocultada**: La URL de Notion nunca se expone en el navegador
- **📱 Responsive**: Diseño adaptativo para todos los dispositivos
- **🌙 Modo Oscuro**: Soporte automático para tema oscuro

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, JWT Authentication
- **Integración**: Notion API (`@notionhq/client`)
- **Estilos**: CSS personalizado para replicar Notion

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Notion
- Notion workspace con permisos de administrador

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd notion-embedded
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# JWT Secret para autenticación
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui

# Configuración de Notion API
NOTION_API_KEY=secret_tu_token_de_notion_aqui
NOTION_PAGE_ID=el_id_de_tu_pagina_de_notion
```

### 4. Configurar Integración de Notion

#### Paso 1: Crear una Integración en Notion

1. Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Haz clic en **"New integration"**
3. Completa la información:
   - **Name**: `Codeable Labs Integration` (o el nombre que prefieras)
   - **Logo**: Opcional
   - **Associated workspace**: Selecciona tu workspace
4. Haz clic en **"Submit"**
5. **Copia el "Internal Integration Token"** (debe empezar con `secret_`)

#### Paso 2: Compartir la Página con la Integración

1. Abre la página de Notion que quieres embeber
2. Haz clic en **"Share"** (Compartir) en la esquina superior derecha
3. Haz clic en **"Invite"**
4. Busca el nombre de tu integración (ej. "Codeable Labs Integration")
5. Selecciona la integración y haz clic en **"Invite"**
6. Asegúrate de que tenga permisos de **"Can view"** como mínimo

#### Paso 3: Obtener el Page ID

El Page ID es la parte final de la URL de Notion:

```
https://www.notion.so/Sesiones-1-1-28be9e2e2a388084842ff409d5ee27fd
```

En este caso, el `NOTION_PAGE_ID` es: `28be9e2e2a388084842ff409d5ee27fd`

#### Paso 4: Actualizar .env.local

```env
JWT_SECRET=mi_super_secreto_jwt_para_notion_embedded_2024
NOTION_API_KEY=secret_tu_token_copiado_aqui
NOTION_PAGE_ID=28be9e2e2a388084842ff409d5ee27fd
```

### 5. Ejecutar la Aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 👥 Usuarios de Prueba

La aplicación incluye usuarios de prueba para desarrollo:

| Usuario | Contraseña | Rol           |
| ------- | ---------- | ------------- |
| `admin` | `admin123` | Administrador |
| `user`  | `user123`  | Usuario       |
| `demo`  | `demo123`  | Demo          |

## 📁 Estructura del Proyecto

```
notion-embedded/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── login/route.ts          # Endpoint de login
│   │   │   └── notion/
│   │   │       └── api-content/route.ts    # API de Notion
│   │   ├── login/page.tsx                  # Página de login
│   │   ├── welcome/page.tsx                # Página principal con Notion
│   │   └── layout.tsx                      # Layout principal
│   ├── components/
│   │   ├── LoginForm.tsx                   # Formulario de login
│   │   └── NotionAPIEmbed.tsx              # Componente de Notion
│   ├── contexts/
│   │   └── AuthContext.tsx                 # Contexto de autenticación
│   ├── lib/
│   │   └── auth.ts                         # Lógica de autenticación
│   └── styles/
│       └── notion.css                      # Estilos de Notion
├── .env.local                              # Variables de entorno
└── README.md                               # Este archivo
```

## 🔧 API Endpoints

### POST `/api/auth/login`

Endpoint para autenticación de usuarios.

**Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### GET `/api/notion/api-content?token=<jwt_token>`

Endpoint para obtener contenido de Notion.

**Response:**

```json
{
  "success": true,
  "content": {
    "page": {
      /* datos de la página */
    },
    "blocks": [
      /* bloques de contenido */
    ],
    "title": "Sesiones 1-1",
    "renderedContent": "<h1>Sesiones 1-1</h1>..."
  }
}
```

## 🎨 Personalización

### Modificar Estilos de Notion

Edita `src/styles/notion.css` para personalizar la apariencia:

```css
/* Cambiar colores principales */
.notion-content {
  color: #37352f; /* Color de texto */
  background: #ffffff; /* Fondo */
}

/* Personalizar títulos */
.notion-content h1 {
  color: #your-color;
  font-size: 2.5em;
}
```

### Agregar Nuevos Tipos de Bloque

Modifica `src/app/api/notion/api-content/route.ts` en la función `renderBlock`:

```typescript
case "your_block_type":
  return `<div class="custom-block">${renderRichText(block.your_block_type.rich_text)}</div>`;
```

## 🚀 Despliegue

### Variables de Entorno en Producción

Asegúrate de configurar estas variables en tu plataforma de despliegue:

```env
JWT_SECRET=tu_secreto_jwt_produccion_super_seguro
NOTION_API_KEY=secret_tu_token_notion_produccion
NOTION_PAGE_ID=id_de_pagina_notion_produccion
```

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente

### Otras Plataformas

- **Netlify**: Configura variables de entorno en Site Settings
- **Railway**: Usa el dashboard de Railway para configurar variables
- **Heroku**: Usa `heroku config:set VARIABLE_NAME=value`

## 🔒 Seguridad

### Mejores Prácticas

1. **JWT Secret**: Usa un secreto fuerte y único en producción
2. **HTTPS**: Siempre usa HTTPS en producción
3. **Variables de Entorno**: Nunca commits secrets al repositorio
4. **Notion Permissions**: Usa permisos mínimos necesarios en Notion

### Configuración de Notion Segura

- Crea integraciones específicas para cada entorno (desarrollo/producción)
- Usa diferentes workspaces para desarrollo y producción
- Revisa regularmente los permisos de las integraciones

## 🐛 Solución de Problemas

### Error: "Invalid or expired token"

- Verifica que `JWT_SECRET` esté configurado correctamente
- Asegúrate de que el token no haya expirado (24h por defecto)

### Error: "Notion API error"

- Verifica que `NOTION_API_KEY` sea correcto
- Asegúrate de que la página esté compartida con la integración
- Verifica que `NOTION_PAGE_ID` sea correcto

### Error: "Page not found"

- Verifica que la página de Notion sea accesible
- Asegúrate de que la integración tenga permisos de lectura

### El contenido no se muestra

- Revisa la consola del navegador para errores
- Verifica los logs del servidor en el terminal
- Asegúrate de que la página de Notion tenga contenido

## 📊 Ventajas vs Limitaciones

### ✅ Ventajas

- **URL completamente oculta** - No hay iframe, todo se renderiza en tu servidor
- **Contenido real de Notion** - Obtienes el contenido directamente de Notion
- **Autenticación completa** - Control total sobre quién accede
- **Personalización total** - Puedes diseñar la interfaz como quieras
- **Rendimiento controlado** - No depende de la velocidad de Notion
- **SEO Friendly** - El contenido es indexable por motores de búsqueda

### ⚠️ Limitaciones

- **Solo contenido estático** - No tendrás las funciones interactivas de Notion
- **Sin edición en tiempo real** - Los usuarios no podrán editar directamente
- **Sin colaboración** - No habrá comentarios, sugerencias, etc.
- **Sincronización manual** - Los cambios en Notion requieren refrescar la página

## 📚 Recursos Adicionales

- [Documentación de Notion API](https://developers.notion.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/) - Para debuggear tokens JWT

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado por el equipo de **Codeable Labs**.

---

**¿Necesitas ayuda?** Contacta al equipo de desarrollo o crea un issue en el repositorio.

**Última actualización**: Enero 2025
