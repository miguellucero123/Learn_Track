# Guía de Implementación - LearnTrack Dashboard
## Proyecto Módulo 3 - Diapositiva 15

---

## 📚 Resumen Ejecutivo

Este proyecto implementa **LearnTrack Dashboard**, un sistema predictivo de retención estudiantil, aplicando todas las tecnologías y metodologías requeridas en la Diapositiva 15:

✅ **SASS** - Preprocesamiento con variables, mixins y parciales  
✅ **Bootstrap 4** - Grid responsivo y componentes  
✅ **BEM** - Metodología de nomenclatura de clases  
✅ **Modelo de Cajas** - Layouts modernos y responsivos  
✅ **Git/GitHub** - Control de versiones profesional  

---

## 🎯 Cumplimiento de Requisitos

### 1. Metodología de Estilos (BEM)

**Implementación:**
```scss
// BLOQUE
.learntrack-header { }

// ELEMENTO
.learntrack-header__navbar { }
.learntrack-header__brand { }
.learntrack-header__link { }

// MODIFICADOR
.learntrack-header__link--active { }
.kpi-card--danger { }
.kpi-card--success { }
```

**Componentes con BEM:**
- `learntrack-header` (navbar)
- `hero-section` (portada)
- `kpi-card` (tarjetas de KPI)
- `feature-card` (características)
- `roi-card` (retorno de inversión)
- `contact-card` (contacto)
- `step-card` (pasos)

---

### 2. SASS y Modularización

**Estructura de Archivos:**
```
scss/
├── main.scss              # Archivo principal
├── base/
│   ├── _variables.scss    # Variables de diseño
│   ├── _mixins.scss       # Mixins reutilizables
│   └── _base.scss         # Estilos base
├── layout/
│   └── _layout.scss       # Header, footer, secciones
└── components/
    ├── _hero.scss         # Sección hero
    ├── _dashboard.scss    # Dashboard y KPIs
    ├── _features.scss     # Características
    ├── _impact.scss       # Impacto y ROI
    └── _contact.scss      # Contacto
```

**Variables Implementadas:**
```scss
// Colores
$color-primary: #667eea;
$color-success: #43e97b;
$color-danger: #ff6e7f;

// Tipografía
$font-primary: 'Inter', sans-serif;
$font-size-base: 16px;

// Espaciado
$spacing-sm: 12px;
$spacing-md: 16px;
$spacing-lg: 24px;

// Sombras
$shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
```

**Mixins Creados:**
```scss
@mixin gradient-bg($gradient) { }
@mixin box-shadow($shadow) { }
@mixin card-base { }
@mixin button-gradient($gradient) { }
@mixin glassmorphism($opacity) { }
@mixin respond-to($breakpoint) { }
```

**Anidamiento:**
```scss
.hero-section {
  &__content {
    &__title { }
    &__subtitle { }
  }
  
  &__btn {
    &--primary { }
    &--secondary { }
  }
}
```

---

### 3. Bootstrap 4

**Grid System:**
```html
<!-- Mobile: 1 columna -->
<div class="col-12 col-md-6 col-lg-4">
  <!-- Tablet: 2 columnas -->
  <!-- Desktop: 3 columnas -->
</div>
```

**Componentes Utilizados:**

1. **Navbar** - Header responsivo con collapse
2. **Cards** - Tarjetas de KPI, features, ROI
3. **Buttons** - Botones con variantes (primary, outline)
4. **Forms** - Formulario de contacto
5. **Tables** - Tabla de estudiantes en riesgo
6. **Badges** - Indicadores de estado
7. **Grid** - Sistema de columnas responsivo

**Ejemplo de Implementación:**
```html
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark">
  <button class="navbar-toggler" data-toggle="collapse">
  </button>
</nav>

<!-- Grid -->
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">
    <!-- Card -->
  </div>
</div>

<!-- Form -->
<form class="contact-form">
  <div class="form-group">
    <input type="text" class="form-control">
  </div>
</form>
```

---

### 4. Modelo de Cajas y Layout

**Estructura HTML:**
```html
<body>
  <!-- HEADER -->
  <header class="learntrack-header">
    <nav class="navbar">...</nav>
  </header>

  <!-- MAIN CONTENT -->
  <main class="learntrack-main">
    <section id="home">...</section>
    <section id="dashboard">...</section>
    <section id="features">...</section>
    <section id="impact">...</section>
    <section id="contact">...</section>
  </main>

  <!-- FOOTER -->
  <footer class="learntrack-footer">...</footer>
</body>
```

**Responsividad:**

**Mobile (≤420px):**
- Cards apiladas en 1 columna
- Navbar colapsable
- Fuentes reducidas
- Espaciado optimizado

**Tablet (768px-1023px):**
- 2 columnas en grid
- Espaciado intermedio

**Desktop (≥1024px):**
- 3-4 columnas en grid
- Espaciado completo
- Efectos hover avanzados

---

## 🎨 Características de Diseño

### Glassmorphism
```scss
@mixin glassmorphism($opacity: 0.1) {
  background: rgba(255, 255, 255, $opacity);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Gradientes Vibrantes
```scss
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$gradient-success: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
```

### Animaciones Suaves
```scss
@mixin hover-lift($distance: -8px) {
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY($distance);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  }
}
```

### Micro-interacciones
- Hover effects en cards
- Transiciones suaves
- Animaciones de entrada
- Scroll-to-top button
- Counter animations

---

## 📱 Responsive Design

### Breakpoints Bootstrap 4
```scss
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
```

### Media Queries
```scss
@include respond-to(xs) {
  // Estilos para móvil
}

@include respond-to(md) {
  // Estilos para tablet
}

@include respond-to(lg) {
  // Estilos para desktop
}
```

---

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalación
```bash
cd Proyecto_diapo15
npm install
```

### 2. Compilar SASS

**Desarrollo (con watch):**
```bash
npm run sass:watch
```

**Producción (comprimido):**
```bash
npm run sass:build
```

### 3. Abrir en Navegador
```bash
# Abrir index.html directamente
# O usar Live Server en VS Code
```

---

## 📊 Componentes Principales

### 1. Hero Section
- **Gradiente animado** de fondo
- **Glassmorphism** en stat cards
- **CTAs** con hover effects
- **Responsive** en todos los dispositivos

### 2. Dashboard
- **KPI Cards** con colores de estado
- **Tabla** de estudiantes en riesgo
- **Badges** para niveles de riesgo
- **Botones** de acción

### 3. Features
- **6 tarjetas** de características
- **Iconos circulares** con gradientes
- **Hover lift** effects
- **Listas** con checkmarks

### 4. Impact
- **Tabla comparativa** por carrera
- **ROI Cards** con variante featured
- **Métricas** destacadas
- **Gradientes** en headers

### 5. Contact
- **Formulario** con validación
- **Cards** de información
- **Step cards** numeradas
- **Glassmorphism** effects

---

## 🎯 Mejores Prácticas Aplicadas

### CSS/SASS
✅ Variables para todos los valores reutilizables  
✅ Mixins para patrones repetitivos  
✅ Anidamiento lógico (máximo 3 niveles)  
✅ Parciales organizados por función  
✅ Nombres de clases descriptivos (BEM)  

### HTML
✅ Estructura semántica (header, main, footer, section)  
✅ Atributos aria para accesibilidad  
✅ IDs únicos para navegación  
✅ Clases consistentes con BEM  

### JavaScript
✅ Código modular y organizado  
✅ Event listeners eficientes  
✅ Validación de formularios  
✅ Animaciones suaves  
✅ Comentarios descriptivos  

### Git
✅ .gitignore configurado  
✅ README completo  
✅ Estructura de proyecto clara  
✅ Commits descriptivos recomendados  

---

## 📝 Checklist de Requisitos

### Funcionales
- [x] Listado de lugares (estudiantes) en Home
- [x] Cards con información de clima (riesgo)
- [x] Vista de detalle (tabla de estudiantes)
- [x] Header/navbar consistente
- [x] Footer con información del proyecto
- [x] Secciones reconocibles

### Técnicos - SASS
- [x] Estructura de parciales
- [x] Variables (colores, tipografías, espaciados)
- [x] Anidamiento
- [x] Al menos 1 mixin
- [x] Compilación a CSS

### Técnicos - Bootstrap
- [x] Grid system (col-12, col-md-6, col-lg-4)
- [x] Al menos 2 componentes
- [x] Incluido vía CDN

### Técnicos - BEM
- [x] Nomenclatura consistente
- [x] Bloques, elementos y modificadores
- [x] Organización clara

### Responsividad
- [x] Mobile (≤420px): 1 columna
- [x] Desktop (≥1024px): múltiples columnas
- [x] Espaciado coherente

---

## 🎨 Paleta de Colores

### Principales
- **Primary**: `#667eea` → `#764ba2`
- **Secondary**: `#f093fb` → `#f5576c`

### Estados
- **Success**: `#43e97b` → `#38f9d7`
- **Info**: `#4facfe` → `#00f2fe`
- **Warning**: `#fa709a` → `#fee140`
- **Danger**: `#ff6e7f` → `#bfe9ff`

### Neutros
- **Dark**: `#1a1a1a`
- **Gray**: `#7f8c8d`
- **Light**: `#ecf0f1`
- **White**: `#ffffff`

---

## 📚 Recursos y Referencias

### Documentación
- [SASS Documentation](https://sass-lang.com/documentation)
- [Bootstrap 4 Documentation](https://getbootstrap.com/docs/4.6/)
- [BEM Methodology](http://getbem.com/)

### Tipografías
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts - Outfit](https://fonts.google.com/specimen/Outfit)

### Iconos
- [Font Awesome 6](https://fontawesome.com/)

---

## 🔄 Próximos Pasos

1. **Integración con API** de datos estudiantiles reales
2. **Gráficos interactivos** con Chart.js o D3.js
3. **Sistema de autenticación** para usuarios
4. **Panel de administración** completo
5. **Exportación de reportes** en PDF
6. **Modo oscuro/claro** toggle
7. **Optimización de performance**
8. **Testing** automatizado

---

## 📞 Soporte

Para preguntas o problemas:
- **Email**: contacto@learntrack.cl
- **Documentación**: README.md
- **Código fuente**: Revisar comentarios en archivos

---

**Desarrollado con ❤️ siguiendo las mejores prácticas de SASS, Bootstrap 4 y BEM**

*Proyecto Académico - Técnico en Análisis de Datos - AIEP 2025*
