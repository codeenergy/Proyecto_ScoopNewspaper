# 📊 Guía Completa: Configurar Publicidad en ScoopNewspaper

## 🎯 Opciones de Plataformas de Publicidad

### 1. **Google AdSense** (Recomendado para principiantes)
- ✅ Más popular y fácil de usar
- ✅ Pagos automáticos cuando alcanzas $100
- ✅ Variedad de formatos de anuncios
- ⏱️ Aprobación: 1-2 semanas

### 2. **Media.net** (Alternativa a AdSense)
- ✅ Buen CPM para contenido en inglés
- ✅ Anuncios contextuales de calidad
- ⏱️ Aprobación: 3-5 días

### 3. **PropellerAds** (Aprobación rápida)
- ✅ Aprobación instantánea
- ✅ Pagos desde $5
- ⚠️ Anuncios más agresivos (pop-ups)

### 4. **Carbon Ads** (Para sitios tech)
- ✅ Anuncios discretos y premium
- ✅ Mejor para audiencias técnicas
- ⚠️ Requisitos de tráfico más altos

---

## 🚀 OPCIÓN 1: Google AdSense (Paso a Paso)

### Paso 1: Crear Cuenta en AdSense

1. Ve a: [https://www.google.com/adsense](https://www.google.com/adsense)
2. Haz clic en **"Comenzar"**
3. Inicia sesión con tu cuenta de Google
4. Completa el formulario:
   - URL del sitio web: `tu-dominio.com`
   - País/región
   - Acepta términos y condiciones

### Paso 2: Agregar tu Sitio Web

1. En el panel de AdSense, ve a **"Sitios web"**
2. Agrega tu dominio
3. AdSense te dará un **código de verificación**

### Paso 3: Instalar Código de Verificación

Copia el código que te da AdSense y pégalo en el `<head>` de tu `index.html`:

```html
<!-- index.html -->
<head>
  <!-- ... otros meta tags ... -->

  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
       crossorigin="anonymous"></script>
</head>
```

**Reemplaza `ca-pub-XXXXXXXXXX` con tu ID de editor de AdSense**

### Paso 4: Solicitar Revisión

1. Regresa a AdSense
2. Haz clic en **"Solicitar revisión"**
3. Espera 1-2 semanas para aprobación
4. Google revisará:
   - Contenido original y de calidad ✅
   - Tráfico mínimo (generalmente 50+ visitas/día)
   - Política de privacidad
   - Navegación clara

### Paso 5: Crear Unidades de Anuncios

Una vez aprobado:

1. Ve a **"Anuncios" → "Por unidad de anuncio"**
2. Crea anuncios:
   - **Display** (banners)
   - **In-feed** (dentro del feed de noticias)
   - **In-article** (dentro de artículos)
   - **Multiplex** (grid de anuncios)

3. Para cada anuncio obtendrás un código HTML

---

## 💻 Integración en ScoopNewspaper

### Ubicaciones Estratégicas para Anuncios

#### 1. **Banner Superior (Header)**
- Debajo del Breaking News Ticker
- Tamaño: 728x90 (Leaderboard) o 970x90 (Super Leaderboard)

#### 2. **Sidebar Derecho**
- Entre artículos en el feed
- Tamaño: 300x250 (Medium Rectangle) o 300x600 (Half Page)

#### 3. **In-Feed Ads**
- Cada 6 artículos en el grid
- Formato: Native ads que se mezclan con el contenido

#### 4. **Banner Inferior (Footer)**
- Antes del footer
- Tamaño: 728x90 (Leaderboard)

#### 5. **In-Article**
- Dentro del modal de "Read More"
- Entre párrafos del contenido

---

## 📝 Código de Ejemplo: Componente de Anuncio

Crea un componente reutilizable para AdSense:

```typescript
// src/components/AdSense.tsx
import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="ad-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};
```

### Uso del Componente:

```typescript
// En NewsFeed.tsx
import { AdSense } from './AdSense';

// Dentro del grid de artículos
{articles.map((article, index) => (
  <>
    {/* Artículo */}
    <ArticleCard article={article} />

    {/* Anuncio cada 6 artículos */}
    {(index + 1) % 6 === 0 && (
      <AdSense
        adSlot="1234567890"
        adFormat="fluid"
        style={{ minHeight: '250px' }}
      />
    )}
  </>
))}
```

---

## 🎨 Mejores Prácticas

### ✅ DO (Hacer)

1. **Colocar anuncios estratégicamente**
   - Above the fold (parte visible sin scroll)
   - Entre contenido natural
   - Después de contenido de valor

2. **Balance contenido/anuncios**
   - Máximo 3 anuncios por página
   - No más del 30% de la página

3. **Optimizar para móvil**
   - Usar anuncios responsive
   - Tamaños adaptables

4. **Probar diferentes ubicaciones**
   - A/B testing
   - Analizar métricas

### ❌ DON'T (No hacer)

1. **No hacer clic en tus propios anuncios**
   - Google te baneará permanentemente
   - Usa "Vista previa" en AdSense

2. **No pedir clics**
   - "Haz clic en los anuncios"
   - Flechas apuntando a ads

3. **No colocar demasiados anuncios**
   - Afecta experiencia de usuario
   - Reduce tasa de clics

4. **No usar palabras prohibidas**
   - Contenido para adultos
   - Violencia, drogas, etc.

---

## 📊 Configuración de Política de Privacidad

**⚠️ IMPORTANTE: Requerido por ley (GDPR, CCPA)**

Crea archivo `PRIVACY_POLICY.md` con:

```markdown
# Política de Privacidad

## Google AdSense
Este sitio usa Google AdSense para mostrar anuncios. Google usa cookies para:
- Mostrar anuncios relevantes
- Limitar cantidad de veces que ves un anuncio
- Medir efectividad de anuncios

Puedes desactivar anuncios personalizados en:
https://www.google.com/settings/ads

## Cookies
Usamos cookies de terceros (Google AdSense) para mejorar tu experiencia.

## Datos Recopilados
- Dirección IP
- Comportamiento de navegación
- Ubicación aproximada

Para más información: support@scoopnewspaper.com
```

### Agregar enlace en Footer:

```typescript
// Footer.tsx
<a href="/privacy-policy" className="text-gray-400 hover:text-blue-400">
  Privacy Policy
</a>
```

---

## 🔧 Configuración de Consent Banner (GDPR)

Usa un banner de consentimiento de cookies:

### Opción 1: Google Funding Choices (Gratis)

1. Ve a: [https://fundingchoices.google.com](https://fundingchoices.google.com)
2. Crea un mensaje de consentimiento
3. Copia el código e instala en `index.html`

### Opción 2: CookieConsent.js (Alternativa)

```html
<!-- index.html -->
<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css">

<script>
window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#1a1a1a" },
      button: { background: "#3b82f6" }
    },
    content: {
      message: "Este sitio usa cookies para mejorar tu experiencia y mostrar anuncios.",
      dismiss: "Aceptar",
      link: "Más información",
      href: "/privacy-policy"
    }
  })
});
</script>
```

---

## 💰 Estimación de Ingresos

### Factores que Afectan Ingresos:

1. **RPM (Revenue Per Mille)**: $1-$15 por 1000 visitas
2. **CTR (Click Through Rate)**: 0.5%-3%
3. **CPC (Cost Per Click)**: $0.20-$5

### Ejemplo de Cálculo:

```
1,000 visitas/día
× 30 días
= 30,000 visitas/mes

RPM de $5
= $150/mes

Con CTR de 2% y CPC de $0.50
= 600 clics × $0.50
= $300/mes adicionales

TOTAL: $450/mes aproximadamente
```

### Para Aumentar Ingresos:

1. **Más tráfico** → SEO, redes sociales
2. **Mejor contenido** → Mayor engagement
3. **Nichos rentables** → Tech, finanzas, salud
4. **Optimizar ubicaciones** → Testing A/B
5. **Múltiples idiomas** → Mercados internacionales

---

## 🚦 Timeline de Implementación

### Semana 1: Preparación
- [ ] Crear cuenta AdSense
- [ ] Agregar política de privacidad
- [ ] Instalar código de verificación
- [ ] Solicitar revisión

### Semana 2-3: Espera de Aprobación
- [ ] Crear contenido de calidad
- [ ] Generar tráfico (SEO, social media)
- [ ] Optimizar experiencia de usuario

### Semana 4: Activación
- [ ] Crear unidades de anuncio
- [ ] Implementar componente AdSense
- [ ] Agregar anuncios en ubicaciones estratégicas
- [ ] Instalar consent banner

### Semana 5+: Optimización
- [ ] Monitorear métricas en AdSense
- [ ] Probar diferentes ubicaciones
- [ ] Ajustar basado en rendimiento
- [ ] Escalar tráfico

---

## 📈 Herramientas de Monitoreo

### Google Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Métricas Importantes:
- **Visitas/día**: Meta inicial 100+
- **Bounce Rate**: <60%
- **Tiempo en página**: >2 minutos
- **Páginas por sesión**: >2

---

## 🆘 Solución de Problemas

### "Anuncios no se muestran"
- ✅ Verifica que el código esté correcto
- ✅ Espera 24-48 horas después de activar
- ✅ Limpia caché del navegador
- ✅ Desactiva AdBlocker

### "Cuenta suspendida"
- ❌ Clicks inválidos detectados
- ❌ Contenido prohibido
- ❌ Violación de políticas
- ⚠️ Apelación: support.google.com/adsense

### "RPM muy bajo"
- Mejora calidad de tráfico (evita bots)
- Optimiza ubicaciones de anuncios
- Enfócate en nichos más rentables
- Aumenta engagement del contenido

---

## 🎓 Recursos Adicionales

- [Google AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [Optimize Ad Performance](https://support.google.com/adsense/answer/9183549)
- [YouTube: AdSense Tutorials](https://www.youtube.com/results?search_query=google+adsense+tutorial)

---

## 📞 Contacto y Soporte

Si tienes problemas:
1. Revisa AdSense Help Center
2. Foro de AdSense Community
3. Twitter: @GoogleAdSense
4. Email: Tu Account Manager (si tienes uno)

---

**🎉 ¡Buena suerte monetizando ScoopNewspaper!**

_Recuerda: El contenido de calidad y el tráfico orgánico son la clave del éxito._
