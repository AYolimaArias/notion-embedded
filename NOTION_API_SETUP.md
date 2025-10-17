# Configuración de Notion API

## 🎯 Objetivo

Esta solución usa la **API oficial de Notion** para obtener el contenido de la página y renderizarlo en tu aplicación, **ocultando completamente la URL de Notion**.

## ✅ Ventajas

- **URL completamente oculta** - No hay iframe, todo se renderiza en tu servidor
- **Contenido real de Notion** - Obtienes el contenido directamente de Notion
- **Autenticación completa** - Control total sobre quién accede
- **Personalización total** - Puedes diseñar la interfaz como quieras

## ⚠️ Limitaciones

- **Solo contenido estático** - No tendrás las funciones interactivas de Notion
- **Sin edición en tiempo real** - Los usuarios no podrán editar directamente
- **Sin colaboración** - No habrá comentarios, sugerencias, etc.
- **Complejidad de implementación** - Requiere más trabajo de desarrollo

## 🔧 Configuración Paso a Paso

### 1. Crear una Integración en Notion

1. Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Haz clic en "New integration"
3. Completa los datos:
   - **Name**: `Codeable Labs Integration`
   - **Logo**: (opcional)
   - **Associated workspace**: Selecciona tu workspace
4. Haz clic en "Submit"
5. **Copia el Internal Integration Token** (empieza con `secret_`)

### 2. Compartir la Página con la Integración

1. Ve a tu página de Notion: `https://www.notion.so/Sesiones-1-1-28be9e2e2a388084842ff409d5ee27fd`
2. Haz clic en "Share" (compartir) en la esquina superior derecha
3. Haz clic en "Invite"
4. Busca tu integración por nombre: `Codeable Labs Integration`
5. Selecciona la integración y haz clic en "Invite"

### 3. Obtener el Page ID

El Page ID es la parte final de la URL de Notion:

```
https://www.notion.so/Sesiones-1-1-28be9e2e2a388084842ff409d5ee27fd
                                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                                                    Este es el Page ID
```

### 4. Configurar las Variables de Entorno

Actualiza tu archivo `.env.local`:

```env
JWT_SECRET=mi_super_secreto_jwt_para_notion_embedded_2024
NOTION_URL=https://v2-embednotion.com/28be9e2e2a388084842ff409d5ee27fd

# Notion API Configuration
NOTION_API_KEY=secret_tu_integration_token_aqui
NOTION_PAGE_ID=28be9e2e2a388084842ff409d5ee27fd
```

## 🚀 Cómo Usar

### Opción 1: Página Dedicada (Recomendado)

Visita: `http://localhost:3000/notion-api`

### Opción 2: Reemplazar el Componente Actual

Modifica `src/app/welcome/page.tsx`:

```typescript
// Cambiar de:
import NotionEmbed from "@/components/NotionEmbed";

// A:
import NotionAPIEmbed from "@/components/NotionAPIEmbed";

export default function WelcomePage() {
  return <NotionAPIEmbed />;
}
```

## 🎨 Personalización

### Estilos CSS

Puedes personalizar la apariencia editando los estilos en `NotionAPIEmbed.tsx`:

```css
.notion-content {
  /* Tus estilos personalizados aquí */
}

.todo-item {
  /* Estilos para elementos de lista de tareas */
}

.callout {
  /* Estilos para callouts */
}

.embed-container {
  /* Estilos para embeds */
}
```

### Tipos de Bloque Soportados

- ✅ Párrafos
- ✅ Encabezados (H1, H2, H3)
- ✅ Listas con viñetas y numeradas
- ✅ Listas de tareas
- ✅ Toggles
- ✅ Código
- ✅ Citas
- ✅ Callouts
- ✅ Divisores
- ✅ Imágenes
- ✅ Videos
- ✅ Embeds
- ✅ Bookmarks
- ✅ Link previews
- ⚠️ Tablas (básico)

## 🔍 Debugging

### Verificar la Configuración

1. Revisa que `NOTION_API_KEY` esté configurado correctamente
2. Revisa que `NOTION_PAGE_ID` sea el correcto
3. Verifica que la página esté compartida con la integración

### Logs del Servidor

Los logs te mostrarán:

- ✅ Usuario autenticado
- ✅ Contenido obtenido de Notion API
- ❌ Errores de autenticación o configuración

## 🆚 Comparación de Soluciones

| Característica  | Iframe + Proxy          | Notion API              |
| --------------- | ----------------------- | ----------------------- |
| URL oculta      | ❌ Visible en #document | ✅ Completamente oculta |
| Funcionalidad   | ✅ 100% de Notion       | ⚠️ Solo lectura         |
| Edición         | ✅ Sí                   | ❌ No                   |
| Colaboración    | ✅ Sí                   | ❌ No                   |
| Personalización | ⚠️ Limitada             | ✅ Total                |
| Complejidad     | ⚠️ Media                | ⚠️ Alta                 |
| Rendimiento     | ⚠️ Depende de Notion    | ✅ Controlado           |

## 🎯 Recomendación

**Para tu caso de uso específico (ocultar URL completamente):**

1. **Si necesitas solo lectura**: Usa **Notion API** ✅
2. **Si necesitas funcionalidad completa**: Acepta la limitación del iframe ⚠️

La **Notion API** es la única solución que garantiza que la URL esté completamente oculta.
