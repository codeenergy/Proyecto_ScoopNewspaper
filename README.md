# 📰 ScoopNewspaper 3D

Bienvenido a **ScoopNewspaper**, una experiencia de noticias interactiva en 3D potenciada por IA. Este proyecto utiliza React, Three.js (vía CSS3D), Framer Motion y la API de Google Gemini.

## 🔑 Configuración de APIs

El proyecto ya incluye un archivo `.env` pre-configurado con las siguientes claves necesarias para el funcionamiento:

*   **Gemini API:** Generación de contenido y resumen de noticias.
*   **NewsAPI:** Obtención de titulares en tiempo real.
*   **OpenWeather API:** Datos meteorológicos en la cabecera.

> **Nota:** Si necesitas cambiar estas claves, edita directamente el archivo `.env` en la raíz del proyecto.

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para arrancar el proyecto en tu entorno local:

### 1. Instalación de Dependencias
Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

### 2. Arrancar el Servidor de Desarrollo
Una vez instaladas las librerías, inicia la aplicación:

```bash
npm run dev
```

La terminal mostrará una URL local, generalmente:
👉 `http://localhost:5173/`

Abre esa dirección en tu navegador para ver la aplicación.

## 📁 Estructura del Proyecto

*   **`src/main.tsx`**: Punto de entrada de la aplicación (Vite).
*   **`src/App.tsx`**: Componente principal y gestión de estado.
*   **`src/components/`**: 
    *   `Newspaper3D`: Lógica de renderizado 3D y paso de páginas.
    *   `PartnerSidebar` & `MysteryLoot`: Sistema de publicidad y recompensas.
    *   `NewsFeed`: Vista alternativa en formato lista (scroll vertical).
*   **`src/services/`**: Lógica de conexión con Google Gemini.
*   **`src/constants.ts`**: Configuración global y textos.

## 🛠️ Solución de Problemas Comunes

**1. Las noticias salen en blanco o dan error:**
*   Verifica que tienes conexión a internet.
*   Asegúrate de que el archivo `.env` existe en la raíz del proyecto.
*   Si estás usando un bloqueador de anuncios (AdBlock), desactívalo para `localhost`, ya que a veces bloquea las llamadas a NewsAPI.

**2. La API de NewsAPI falla en desarrollo (CORS):**
*   El proyecto tiene un sistema de "fallback" (respaldo). Si NewsAPI falla por restricciones del navegador en modo local, **Gemini generará noticias simuladas automáticamente**, por lo que la app nunca se quedará vacía.

¡Disfruta de la lectura en el futuro! 🗞️✨