# Notion Embedded - Codeable Labs

Aplicación React que permite el acceso mediante login a una página que embebe contenido de Notion.

## 🚀 Características

- ✅ Sistema de autenticación con datos mockeados
- ✅ Login con validación de credenciales
- ✅ Página "Welcome Labs" con Notion embebido
- ✅ **Sistema inteligente de embebido de Notion** que prueba múltiples métodos
- ✅ Fallback automático entre diferentes servicios de embebido
- ✅ Diseño moderno y responsivo
- ✅ Rutas protegidas
- ✅ Persistencia de sesión con localStorage

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio (si aún no lo has hecho)
2. Instala las dependencias:

```bash
npm install
```

## 🎯 Uso

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Construir para producción

```bash
npm run build
```

### Vista previa de la build

```bash
npm run preview
```

## 🔐 Credenciales de Acceso

Puedes usar cualquiera de estos usuarios para ingresar:

| Usuario | Contraseña |
| ------- | ---------- |
| admin   | admin123   |
| user    | user123    |
| demo    | demo123    |

## 📁 Estructura del Proyecto

```
notion-embedded/
├── src/
│   ├── components/
│   │   ├── SimpleNotionEmbed.jsx # Componente simple de embebido
│   │   └── SimpleNotionEmbed.css # Estilos del embebido
│   ├── context/
│   │   └── AuthContext.jsx       # Contexto de autenticación
│   ├── pages/
│   │   ├── Login.jsx             # Página de login
│   │   ├── Login.css             # Estilos del login
│   │   ├── WelcomeLabs.jsx       # Página principal con Notion
│   │   └── WelcomeLabs.css       # Estilos de la página principal
│   ├── App.jsx                   # Componente principal con rutas
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── index.html                    # HTML base
├── vite.config.js               # Configuración de Vite
└── package.json                 # Dependencias del proyecto
```

## 🎨 Características del Diseño

- Interfaz moderna con gradientes y animaciones
- Diseño responsivo para móviles y desktop
- Transiciones suaves y efectos hover
- Tarjetas con sombras y bordes redondeados
- Feedback visual para interacciones del usuario

## 🔒 Seguridad

⚠️ **Nota importante**: Esta aplicación usa datos mockeados solo para propósitos de demostración. En un entorno de producción, deberías implementar:

- Autenticación real con backend
- Tokens JWT o sesiones seguras
- Encriptación de contraseñas
- Protección CSRF
- Rate limiting

## 🌐 Notion Embebido Real

La aplicación utiliza **EmbedNotion.com** para embebir el contenido real de Notion:

### Tecnología Utilizada:

- **EmbedNotion.com**: Servicio oficial para embebido de páginas de Notion
- **Iframe directo**: Integración simple y confiable

### Página de Notion:

[Sesiones 1-1](https://www.notion.so/Sesiones-1-1-28be9e2e2a388084842ff409d5ee27fd)

### Cómo Funciona:

1. **Página publicada**: La página de Notion está configurada como pública
2. **EmbedNotion**: Genera el iframe embebible
3. **Integración directa**: El iframe se muestra directamente en la aplicación
4. **Experiencia nativa**: El contenido se ve exactamente como en Notion

### Iframe Utilizado:

```html
<iframe
  src="https://v2-embednotion.com/28be9e2e2a388084842ff409d5ee27fd"
  style="width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px;"
>
</iframe>
```

## 📝 Tecnologías Utilizadas

- React 18
- Vite
- React Router DOM
- Context API para manejo de estado
- CSS moderno con animaciones y gradientes

## 🤝 Contribuir

Si deseas mejorar la aplicación, siéntete libre de hacer un fork y enviar un pull request.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
