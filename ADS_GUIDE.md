
# Guía de Configuración de Publicidad (Ads)

Bienvenido a la guía de integración de anuncios para ScoopNewspaper. Aquí encontrarás dónde se encuentran los anuncios en el código y cómo modificarlos.

---

## 1. Ubicación de los Anuncios en la Web

Actualmente existen dos espacios publicitarios principales:

1.  **Barra Lateral (Partner Sidebar):** Se encuentra a la derecha de la pantalla. Contiene:
    *   Un anuncio destacado principal (Video/Imagen interactiva) en la parte superior.
    *   Una lista de productos patrocinados debajo.
2.  **Anuncio Emergente (Pop-up):** Un aviso flotante que aparece en la esquina inferior derecha después de 30 segundos de uso.

---

## 2. Configurar la Barra Lateral (Sidebar)

Archivo: `components/PartnerSidebar.tsx`

### A. Cambiar el Anuncio Principal (Destacado)
Busca el bloque de código dentro del `div` que tiene el comentario `Section 1`.

*   **Imagen:** Busca la etiqueta `<motion.img>` y cambia el atributo `src`.
    ```tsx
    src="https://tusitio.com/imagen-anuncio.jpg"
    ```
*   **Texto:** Modifica las etiquetas `<p>` debajo de la imagen para cambiar el título y la descripción.
    ```tsx
    <p className="...">Tu Producto Increíble</p>
    <p className="...">La descripción de tu producto...</p>
    ```
*   **Video del Anuncio:** Cuando se hace clic en este anuncio, se abre un modal de video. Para cambiar ese video, edita `components/VideoModal.tsx` (ver sección 4).

### B. Cambiar la Lista de Productos
En el mismo archivo (`PartnerSidebar.tsx`), busca la constante `products` al principio del componente:

```typescript
const products = [
  { 
    id: 1, 
    name: "Reloj Zenith X1", 
    price: "$299", 
    img: "URL_DE_TU_IMAGEN", 
    url: "https://tu-link-de-afiliado.com", 
    desc: "Descripción corta..." 
  },
  // ... añade o quita objetos aquí
];
```
La web actualizará automáticamente la lista basándose en estos datos.

---

## 3. Configurar el Anuncio Emergente (Pop-up)

Archivo: `components/VideoAd.tsx`

Este componente renderiza la tarjeta flotante.

*   **Imagen de Fondo:** Busca la etiqueta `<img>` y cambia el `src`.
*   **Texto:** Busca las etiquetas `<h3>` y `<p>` para cambiar el "AeroBlade X1" y su descripción.
*   **Enlace:** Busca el botón `<button>` o envuelve el componente en un `<a>` tag para redirigir al usuario.

**Tiempo de aparición:**
Para cambiar cuándo aparece, ve a `App.tsx` y busca el `useEffect` con `setTimeout`:
```typescript
// 30000 = 30 segundos. Cambia a 5000 para 5 segundos.
const timer = setTimeout(() => setShowAd(true), 30000); 
```

---

## 4. Configurar el Video (YouTube / Vimeo)

Archivo: `components/VideoModal.tsx`

Este modal se abre al hacer clic en el anuncio principal de la barra lateral.

Actualmente tiene un `iframe` de YouTube. Para poner tu video:

1.  Busca la etiqueta `<iframe>`.
2.  Cambia el `src` por el embed link de tu video.
    *   *Nota:* Para YouTube, usa `https://www.youtube.com/embed/TU_ID_VIDEO`.
    *   Para MP4 directo, cambia el `iframe` por una etiqueta `<video src="..." controls autoplay />`.

```tsx
<iframe 
   width="100%" 
   height="100%" 
   src="https://www.youtube.com/embed/TU_NUEVO_ID?autoplay=1" 
   // ...
></iframe>
```
