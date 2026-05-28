# Tecnovatec — Sitio Web Enterprise

Transformación digital, desarrollo de software y consultoría tecnológica de clase enterprise para organizaciones que lideran el cambio.

---

## Información del Proyecto

- **Empresa:** Tecnovatec SAS
- **Fundación:** Mayo 2013
- **Ubicación:** Colombia
- **Contacto:** +57 300 555 6293 (WhatsApp)
- **Dominio:** [https://tecnovatec.github.io](https://tecnovatec.github.io)

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| HTML | HTML5 semántico, Schema.org JSON-LD |
| CSS | CSS3 moderno, Custom Properties, Grid, Flexbox, backdrop-filter |
| JS | Vanilla ES6+ (sin frameworks) |
| Hosting | GitHub Pages |
| Fonts | Inter (Google Fonts) |
| Icons | SVG inline (sin librerías externas) |

---

## Estructura de Carpetas

```
new-site/
├── index.html          # Página principal (single-page)
├── 404.html            # Página de error
├── sitemap.xml         # Sitemap para motores de búsqueda
├── robots.txt          # Directivas para crawlers
├── README.md           # Este archivo
├── css/
│   └── main.css        # Hoja de estilos principal
├── js/
│   └── main.js         # Scripts principales
└── assets/
    └── logoTecnovatec.png  # Logo oficial
```

---

## Características Implementadas

### Diseño & UX
- Dark mode premium (diseño por defecto)
- Tipografía Inter optimizada
- Animaciones suaves con Intersection Observer
- Partículas interactivas en hero (canvas 2D)
- Microinteracciones en botones y tarjetas
- Glassmorphism en navegación
- Diseño responsive mobile-first
- Accesibilidad WCAG 2.1 AA

### SEO Técnico
- Meta tags avanzados (Open Graph, Twitter Cards)
- Structured Data Schema.org (Organization, WebSite, WebPage, ProfessionalService)
- Canonical URL
- hreflang
- Sitemap.xml
- Robots.txt
- Semantic HTML5

### Performance
- Sin dependencias externas pesadas
- Lazy loading en imágenes
- Fuentes con `display=swap`
- CSS crítico inline en head
- JavaScript diferido (`defer`)
- Animaciones con `requestAnimationFrame`
- Pausa de animaciones en tab inactivo (Visibility API)

### Accesibilidad
- Skip link para navegación por teclado
- ARIA labels y roles
- Contraste de color optimizado
- Navegación por teclado completa
- Reducción de movimiento (`prefers-reduced-motion`)

---

## Deployment en GitHub Pages

### Paso 1: Preparar el repositorio

Asegúrese de que los archivos del sitio estén en la raíz de la rama `gh-pages` (o en la carpeta raíz de `main` si usa GitHub Pages desde `main`).

### Paso 2: Configurar GitHub Pages

1. Vaya a su repositorio en GitHub.
2. Click en **Settings** → **Pages**.
3. En **Source**, seleccione:
   - **Deploy from a branch**
   - Branch: `main` (o `gh-pages`)
   - Folder: `/ (root)`
4. Click **Save**.

### Paso 3: Verificar dominio

El sitio estará disponible en:
```
https://<username>.github.io/<repo-name>/
```

Para usar un dominio personalizado (ej: `www.tecnovatec.com`):
1. Agregue un archivo `CNAME` en la raíz con su dominio.
2. Configure los registros DNS de su proveedor:
   - Tipo A apuntando a las IPs de GitHub Pages
   - O CNAME apuntando a `<username>.github.io`

---

## Optimizaciones Recomendadas Post-Deploy

### Imágenes
- Genere un **OG Image** de 1200×630px y guárdelo en `assets/og-image.png`
- Optimice `logoTecnovatec.png` a tamaños apropiados:
  - Favicon: 32×32px PNG
  - Apple Touch Icon: 180×180px PNG
  - OG Image: 1200×630px PNG/JPG
- Use herramientas como [Squoosh](https://squoosh.app) o [TinyPNG](https://tinypng.com)

### Analytics
Agregue Google Analytics 4 o Plausible (privado) en `<head>` si lo requiere:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### WhatsApp Business
- Configure **WhatsApp Business API** o mantenga el enlace directo a WhatsApp.
- Considere agregar un widget de chat oficial para empresas.

---

## Scripts Útiles

### Validar HTML
```bash
# Usando el validador W3C via CLI (requiere Node.js)
npx html-validate index.html
```

### Auditar Performance (Lighthouse)
```bash
# Usando Lighthouse CLI (requiere Node.js)
npx lighthouse https://tecnovatec.github.io/ --view
```

---

## Licencia

© Tecnovatec SAS. Todos los derechos reservados.

---

## Contacto

- **WhatsApp:** [+57 300 555 6293](https://wa.me/573005556293)
- **Email:** info@tecnovatec.com
- **LinkedIn:** [Tecnovatec](https://www.linkedin.com/company/tecnovatec)
