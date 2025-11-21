# 🚀 Guía Completa: Deploy ScoopNewspaper en Vercel con Dominio Hostalia

## 📋 Tabla de Contenidos
1. [Preparación del Proyecto](#preparación-del-proyecto)
2. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
3. [Deploy en Vercel](#deploy-en-vercel)
4. [Configurar Dominio desde Hostalia](#configurar-dominio-desde-hostalia)
5. [Configuración Avanzada](#configuración-avanzada)
6. [Optimizaciones de Producción](#optimizaciones-de-producción)
7. [Mantenimiento y Actualizaciones](#mantenimiento-y-actualizaciones)

---

## 📦 Preparación del Proyecto

### Paso 1: Crear archivo `.gitignore`

Asegúrate de que tu proyecto tiene un `.gitignore` correcto:

```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment variables
.env
.env.local
.env.production
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel
```

### Paso 2: Crear repositorio en GitHub

1. **Inicializar Git** (si no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ScoopNewspaper 3D"
   ```

2. **Crear repositorio en GitHub**:
   - Ve a [GitHub.com](https://github.com)
   - Clic en "+" → "New repository"
   - Nombre: `scoopnewspaper`
   - Descripción: "Immersive 3D digital newspaper with AI-powered journalism"
   - Público o Privado (elige según prefieras)
   - **NO marques** "Add README" ni ".gitignore" (ya los tienes)
   - Clic en "Create repository"

3. **Conectar tu proyecto local con GitHub**:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/scoopnewspaper.git
   git branch -M main
   git push -u origin main
   ```

---

## 🔐 Configurar Variables de Entorno

### ⚠️ IMPORTANTE: Proteger tus API Keys

**NUNCA subas las API keys a GitHub.** Vamos a moverlas a variables de entorno.

### Paso 1: Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto:

```env
# .env
VITE_NEWS_API_KEY=39d3f89262e248a8914a5d1a397a71ec
VITE_WEATHER_API_KEY=18e874860c7306c232e96c78c4e12ba7
VITE_GEMINI_API_KEY=AIzaSyDwDy3e_pHl4qoUcFu7kZCjdPX37BdLVcQ
```

### Paso 2: Actualizar `constants.ts`

Modifica `src/constants.ts` para usar variables de entorno:

```typescript
// src/constants.ts
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "39d3f89262e248a8914a5d1a397a71ec";
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "18e874860c7306c232e96c78c4e12ba7";
```

### Paso 3: Actualizar `geminiService.ts`

Modifica `src/services/geminiService.ts`:

```typescript
// src/services/geminiService.ts
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDwDy3e_pHl4qoUcFu7kZCjdPX37BdLVcQ';
```

### Paso 4: Verificar que `.env` está en `.gitignore`

Asegúrate de que `.env` está en tu `.gitignore` (ya lo agregamos antes).

### Paso 5: Commit cambios

```bash
git add .
git commit -m "feat: Add environment variables support"
git push
```

---

## 🌐 Deploy en Vercel

### Paso 1: Crear cuenta en Vercel

1. Ve a [Vercel.com](https://vercel.com)
2. Clic en **"Sign Up"**
3. **Conecta con GitHub** (opción recomendada)
4. Autoriza a Vercel a acceder a tu GitHub

### Paso 2: Importar proyecto

1. En el Dashboard de Vercel, clic en **"Add New..." → "Project"**
2. Busca y selecciona el repositorio **"scoopnewspaper"**
3. Clic en **"Import"**

### Paso 3: Configurar el proyecto

**Framework Preset**: Vercel detectará automáticamente **"Vite"** ✅

**Root Directory**: Deja `.` (raíz)

**Build Command**: `npm run build` (ya configurado)

**Output Directory**: `dist` (ya configurado)

### Paso 4: Agregar Variables de Entorno

En la sección **"Environment Variables"**:

```
Name: VITE_NEWS_API_KEY
Value: 39d3f89262e248a8914a5d1a397a71ec

Name: VITE_WEATHER_API_KEY
Value: 18e874860c7306c232e96c78c4e12ba7

Name: VITE_GEMINI_API_KEY
Value: AIzaSyDwDy3e_pHl4qoUcFu7kZCjdPX37BdLVcQ
```

**Para cada variable**:
1. Escribe el **Name**
2. Pega el **Value**
3. Deja marcado: **Production, Preview, Development**
4. Clic en **"Add"**

### Paso 5: Deploy!

1. Clic en **"Deploy"**
2. Espera 2-3 minutos ⏳
3. **¡Listo!** 🎉 Tu sitio estará en: `https://scoopnewspaper.vercel.app`

---

## 🌍 Configurar Dominio desde Hostalia

Ahora vamos a conectar tu dominio de Hostalia con Vercel.

### Paso 1: Obtener información de Vercel

1. En Vercel, ve a tu proyecto → **"Settings" → "Domains"**
2. Clic en **"Add Domain"**
3. Escribe tu dominio: `tudominio.com`
4. Clic en **"Add"**
5. Vercel te mostrará los **registros DNS** que necesitas configurar

**Vercel te dará algo así:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Paso 2: Iniciar sesión en Hostalia

1. Ve a [https://www.hostalia.com](https://www.hostalia.com)
2. Inicia sesión en tu **Panel de Control**
3. Ve a **"Mis Dominios" → "Gestionar DNS"**

### Paso 3: Configurar registros DNS en Hostalia

#### Opción A: Configuración Estándar (Recomendada)

**Elimina registros antiguos** (si existen):
- Elimina cualquier registro A que apunte a otra IP
- Elimina cualquier registro CNAME para www que no sea de Vercel

**Agrega nuevos registros**:

1. **Registro A (para dominio raíz)**:
   ```
   Tipo: A
   Nombre: @ (o déjalo vacío)
   Valor/Destino: 76.76.21.21
   TTL: 3600 (o el valor por defecto)
   ```

2. **Registro CNAME (para www)**:
   ```
   Tipo: CNAME
   Nombre: www
   Valor/Destino: cname.vercel-dns.com
   TTL: 3600
   ```

#### Opción B: Solo CNAME (Alternativa)

Si Hostalia no permite registros A en la raíz:

```
Tipo: CNAME
Nombre: @
Valor: cname.vercel-dns.com
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
TTL: 3600
```

### Paso 4: Guardar cambios

1. **Guarda** los cambios en Hostalia
2. **Espera 5-30 minutos** (propagación DNS)
3. En algunos casos puede tardar hasta **24-48 horas**

### Paso 5: Verificar en Vercel

1. Regresa a Vercel → **Settings → Domains**
2. Espera a que aparezca un ✅ verde al lado de tu dominio
3. Si aparece ⚠️ amarillo, espera más tiempo

### Paso 6: Configurar redirección www

En Vercel, asegúrate de que:
- `tudominio.com` (raíz) es el dominio principal
- `www.tudominio.com` redirige automáticamente a la raíz

**Para configurar:**
1. Ve a **Settings → Domains**
2. Si `www.tudominio.com` está listado, haz clic en **"..."**
3. Selecciona **"Redirect to tudominio.com"**

---

## 🔧 Configuración Avanzada

### SSL/HTTPS Automático

✅ **Vercel configura SSL automáticamente** con Let's Encrypt. No necesitas hacer nada.

Tu sitio estará disponible en:
- `https://tudominio.com` ✅
- `https://www.tudominio.com` ✅

### Configurar vercel.json

Crea `vercel.json` en la raíz para configuraciones avanzadas:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Configurar robots.txt

Crea `public/robots.txt`:

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: https://tudominio.com/sitemap.xml
```

### Configurar sitemap.xml

Crea `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tudominio.com/</loc>
    <lastmod>2024-11-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tudominio.com/privacy-policy</loc>
    <lastmod>2024-11-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

## ⚡ Optimizaciones de Producción

### 1. Comprimir imágenes

Instala paquetes para optimización:

```bash
npm install -D vite-plugin-imagemin
```

Actualiza `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### 2. Lazy Loading

Implementa lazy loading para componentes:

```typescript
// En App.tsx
import { lazy, Suspense } from 'react';

const Newspaper3D = lazy(() => import('./components/Newspaper3D'));
const VideoSupporters = lazy(() => import('./components/VideoSupporters'));

// Uso:
<Suspense fallback={<Loader />}>
  <Newspaper3D />
</Suspense>
```

### 3. Cache de API calls

Implementa cache para reducir llamadas a APIs:

```typescript
// src/utils/cache.ts
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

export const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};
```

---

## 🔄 Mantenimiento y Actualizaciones

### Actualizar contenido

Cada vez que hagas cambios:

```bash
git add .
git commit -m "feat: Add new feature"
git push
```

**Vercel automáticamente** detectará el push y desplegará la nueva versión. 🚀

### Ver logs de deploy

1. Ve a tu proyecto en Vercel
2. Clic en **"Deployments"**
3. Clic en el deployment más reciente
4. Ver **"Build Logs"** para debug

### Rollback a versión anterior

Si algo sale mal:

1. Ve a **Deployments**
2. Encuentra la versión que funcionaba
3. Clic en **"..."** → **"Promote to Production"**

### Analytics

Vercel ofrece analytics gratuito:

1. Ve a tu proyecto → **"Analytics"**
2. Ver:
   - Visitas por página
   - Países de visitantes
   - Dispositivos
   - Performance

---

## 🎯 Checklist Final

### Antes del Deploy:
- [ ] `.gitignore` configurado
- [ ] Variables de entorno en `.env`
- [ ] Código subido a GitHub
- [ ] SEO optimizado (meta tags)
- [ ] `robots.txt` creado
- [ ] `sitemap.xml` creado

### Durante el Deploy:
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Deploy exitoso
- [ ] URL de Vercel funciona correctamente

### Configuración del Dominio:
- [ ] Dominio agregado en Vercel
- [ ] Registros DNS configurados en Hostalia
- [ ] DNS propagado (esperar 5-30 min)
- [ ] SSL activado (automático)
- [ ] www redirige a dominio raíz

### Post-Deploy:
- [ ] Verificar todas las funciones
- [ ] Probar en móvil y desktop
- [ ] Verificar APIs funcionando
- [ ] Configurar Google Analytics
- [ ] Configurar AdSense (si aplica)
- [ ] Submit sitemap a Google Search Console

---

## 🆘 Solución de Problemas

### "Build Failed" en Vercel

**Causa**: Falta alguna dependencia o error en el código

**Solución**:
```bash
# Probar build localmente
npm run build

# Si funciona local, revisar:
# - Variables de entorno en Vercel
# - Node version (Vercel usa Node 18 por defecto)
```

### "Domain not verified" en Vercel

**Causa**: DNS aún no propagado

**Solución**:
- Espera 24-48 horas
- Verifica registros DNS en Hostalia
- Usa [https://dnschecker.org](https://dnschecker.org) para verificar propagación

### "This site can't be reached"

**Causa**: DNS mal configurado

**Solución**:
1. Verifica que los registros A y CNAME sean correctos
2. Espera más tiempo (propagación DNS)
3. Limpia caché DNS local:
   ```bash
   # Windows
   ipconfig /flushdns

   # Mac/Linux
   sudo dscacheutil -flushcache
   ```

### APIs no funcionan en producción

**Causa**: Variables de entorno no configuradas

**Solución**:
1. Ve a Vercel → Settings → Environment Variables
2. Verifica que todas las keys estén agregadas
3. **Redeploy** el proyecto (Deployments → ... → Redeploy)

### Sitio lento

**Solución**:
1. Implementa lazy loading
2. Optimiza imágenes
3. Usa cache para API calls
4. Habilita Vercel Analytics para identificar cuellos de botella

---

## 📚 Recursos Adicionales

### Documentación Oficial:
- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev/guide/)
- [Hostalia Soporte](https://soporte.hostalia.com)

### Herramientas útiles:
- [DNS Checker](https://dnschecker.org) - Verificar propagación DNS
- [PageSpeed Insights](https://pagespeed.web.dev) - Analizar performance
- [GTmetrix](https://gtmetrix.com) - Optimización web
- [SSL Test](https://www.ssllabs.com/ssltest/) - Verificar SSL

### Comunidades:
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vite Discord](https://chat.vitejs.dev/)

---

## 🎉 ¡Felicidades!

Tu ScoopNewspaper 3D está ahora **en producción** con:
- ✅ Deploy automático desde GitHub
- ✅ SSL/HTTPS configurado
- ✅ Dominio personalizado de Hostalia
- ✅ SEO optimizado
- ✅ Performance mejorado

**URL final**: `https://tudominio.com`

---

**Desarrollado por Code Energy**
Website: [https://codeenergy.org](https://codeenergy.org)

**¿Necesitas ayuda?** Contacta: support@codeenergy.org
