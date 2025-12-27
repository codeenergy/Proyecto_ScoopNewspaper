# 📰 ScoopNewspaper 3D

Bienvenido a **ScoopNewspaper**, una experiencia de noticias interactiva en 3D potenciada por IA. Este proyecto utiliza React, Three.js (vía CSS3D), Framer Motion y la API de Google Gemini.

## ✨ Características Principales

- 🌐 **Soporte Multiidioma**: 4 idiomas (Inglés, Español, Francés, Árabe)
- 📱 **Sistema de Publicidad Integrado**: Monetag ads con control de experiencia de usuario
- 🤖 **IA Avanzada**: Generación y traducción automática de noticias con Gemini
- 🎨 **Interfaz 3D Inmersiva**: Experiencia de lectura única con efecto de periódico real
- 🔄 **Sistema Multi-API**: Múltiples fuentes de noticias con fallback automático

## 🔑 Configuración de APIs

El proyecto utiliza múltiples APIs integradas:

### APIs de Noticias (con sistema de fallback)
1. **NewsData.io API** - Principal (funciona en producción)
2. **NewsAPI** - Secundaria (solo localhost)
3. **Gemini AI** - Generación automática de noticias
4. **Mock Articles** - Respaldo final

### Otras APIs
*   **Gemini API:** Generación de contenido, traducción y resumen de noticias
*   **OpenWeather API:** Datos meteorológicos en la cabecera
*   **Monetag Ads:** Sistema de monetización integrado

## 🔐 Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno para proteger las API keys. Sigue estos pasos:

### 1. Crear archivo .env

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

### 2. Configurar tus API Keys

Edita el archivo `.env` y añade tus propias API keys:

```env
# OpenWeather API Key (https://openweathermap.org/api)
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui

# Google Gemini API Key (https://makersuite.google.com/app/apikey)
VITE_GEMINI_API_KEY=tu_api_key_aqui

# NewsData.io API Key (https://newsdata.io/)
VITE_NEWSDATA_API_KEY=tu_api_key_aqui
```

> **Importante:** Nunca compartas tu archivo `.env` ni subas API keys al repositorio público.

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para arrancar el proyecto en tu entorno local:

### 1. Instalación de Dependencias
Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

### 2. Configurar Variables de Entorno
Asegúrate de haber creado tu archivo `.env` con las API keys (ver sección anterior).

### 3. Arrancar el Servidor de Desarrollo
Una vez instaladas las librerías y configuradas las variables de entorno, inicia la aplicación:

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

## 🌍 Internacionalización

El proyecto soporta 4 idiomas completos:
- 🇬🇧 **Inglés** - Idioma por defecto
- 🇪🇸 **Español** - Traducción completa
- 🇫🇷 **Francés** - Traducción completa
- 🇸🇦 **Árabe** - Traducción completa con soporte RTL

Las noticias en inglés se traducen automáticamente usando Gemini AI para otros idiomas.

## 📊 Sistema de Publicidad

Integración controlada de **Monetag Ads**:
- Native Banner (Zona: 10331862)
- Vignette Banner (Zona: 10325588)
- Push Notifications (Zona: 10325585)
- Popunder/Direct Link (Zona: 10325584)

El sistema está diseñado para no afectar la experiencia del usuario.

---

¡Disfruta de la lectura en el futuro! 🗞️✨

**Última actualización:** Diciembre 2024 - v2.0