# LearnTrack Dashboard - Sistema Predictivo de Retención Estudiantil

![LearnTrack Logo](https://img.shields.io/badge/LearnTrack-Dashboard-667eea?style=for-the-badge)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_4-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Descripción del Proyecto

**LearnTrack Dashboard** es un sistema predictivo de retención estudiantil que combina **Inteligencia Artificial**, **Machine Learning** y **Explicabilidad Total** para reducir la deserción estudiantil hasta un 12%.

Este proyecto fue desarrollado como parte del **Módulo 3** del programa de Técnico en Análisis de Datos en AIEP, aplicando metodologías modernas de desarrollo web:

- ✅ **SASS** para preprocesamiento CSS
- ✅ **Bootstrap 4** para diseño responsivo
- ✅ **BEM** (Block Element Modifier) para organización de estilos
- ✅ **Modelo de cajas** y layouts modernos
- ✅ **Git/GitHub** para control de versiones

---

## 🎯 Objetivos de Aprendizaje

1. **Metodología de organización de estilos**: Aplicación de BEM en toda la interfaz
2. **SASS**: Uso de variables, mixins, anidamiento y parciales
3. **Modelo de cajas**: Implementación de layouts responsivos
4. **Bootstrap 4**: Sistema de grid y componentes
5. **Git/GitHub**: Gestión profesional del proyecto

---

## 🚀 Características Principales

### 🎯 Predicción Precisa
- Identifica estudiantes en riesgo con ≥70% de precisión
- F1-Score >0.75, AUC-ROC >0.80
- Modelos: Random Forest + XGBoost + Regresión Logística

### 🧠 Explicabilidad Total (XAI)
- SHAP values muestran factores específicos de riesgo
- No es una caja negra
- Transparencia en cada predicción

### ⚡ Alertas Inteligentes
- Notificaciones automáticas por email
- Priorización: Crítico / Alto / Medio / Bajo
- Escalamiento automático en 72h

### 📊 Dashboard Interactivo
- 15+ visualizaciones en Power BI
- 8 KPIs críticos
- Drill-down por carrera

### 🤖 IA Generativa
- Recomendaciones personalizadas con Azure OpenAI
- Contexto educativo chileno
- Intervenciones específicas

### 📈 Benchmarking
- Comparación vs. promedio nacional
- Métricas por tipo de carrera
- Posicionamiento sectorial

---

## 📁 Estructura del Proyecto

```
Proyecto_diapo15/
│
├── index.html                 # Página principal
├── package.json              # Configuración npm y scripts
├── README.md                 # Este archivo
│
├── scss/                     # Archivos SASS (fuente)
│   ├── main.scss            # Archivo principal que importa todo
│   │
│   ├── base/                # Estilos base
│   │   ├── _variables.scss  # Variables de diseño
│   │   ├── _mixins.scss     # Mixins reutilizables
│   │   └── _base.scss       # Estilos base y reset
│   │
│   ├── layout/              # Estructura de layout
│   │   └── _layout.scss     # Header, footer, secciones
│   │
│   └── components/          # Componentes individuales
│       ├── _hero.scss       # Sección hero
│       ├── _dashboard.scss  # Dashboard y KPIs
│       ├── _features.scss   # Tarjetas de características
│       ├── _impact.scss     # Impacto y ROI
│       └── _contact.scss    # Contacto y formularios
│
├── css/                     # CSS compilado
│   └── main.css            # Archivo CSS final (generado)
│
└── js/                      # JavaScript
    └── main.js             # Funcionalidad interactiva
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **SASS**: Preprocesador CSS con arquitectura modular
- **Bootstrap 4.6.2**: Framework CSS responsivo
- **JavaScript ES6**: Interactividad y animaciones
- **Font Awesome 6**: Iconografía
- **Google Fonts**: Tipografías Inter y Outfit

### Metodologías
- **BEM**: Nomenclatura de clases CSS
- **Mobile First**: Diseño responsivo desde móvil
- **Component-Based**: Arquitectura modular

---

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Proyecto_diapo15
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Compilar SASS**

Para desarrollo (con watch):
```bash
npm run sass:watch
```

Para producción (comprimido):
```bash
npm run sass:build
```

4. **Abrir en el navegador**
```bash
# Simplemente abre index.html en tu navegador
# O usa un servidor local como Live Server en VS Code
```

---

## 🎨 Guía de Estilos

### Colores Principales
- **Primary**: `#667eea` → `#764ba2` (gradiente)
- **Success**: `#43e97b` → `#38f9d7`
- **Info**: `#4facfe` → `#00f2fe`
- **Warning**: `#fa709a` → `#fee140`
- **Danger**: `#ff6e7f` → `#bfe9ff`

### Tipografía
- **Primaria**: Inter (cuerpo de texto)
- **Secundaria**: Outfit (títulos)
- **Tamaños**: 14px - 48px (responsivos)

### Espaciado
- **XS**: 8px
- **SM**: 12px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px
- **XXXL**: 64px

### Nomenclatura BEM

```scss
// Bloque
.learntrack-header { }

// Elemento
.learntrack-header__navbar { }
.learntrack-header__brand { }

// Modificador
.learntrack-header__link--active { }
```

---

## 📱 Responsividad

El proyecto está optimizado para:

- **Mobile**: ≤ 420px (1 columna)
- **Tablet**: 768px - 1023px (2 columnas)
- **Desktop**: ≥ 1024px (3-4 columnas)

### Breakpoints Bootstrap 4
- **XS**: < 576px
- **SM**: ≥ 576px
- **MD**: ≥ 768px
- **LG**: ≥ 992px
- **XL**: ≥ 1200px

---

## 🧩 Componentes Principales

### 1. Hero Section
- Gradiente animado de fondo
- Estadísticas con glassmorphism
- CTAs con hover effects

### 2. Dashboard
- KPI cards con colores de estado
- Tabla de estudiantes en riesgo
- Filtros y exportación

### 3. Features
- 6 tarjetas de características
- Iconos circulares con gradientes
- Hover lift effects

### 4. Impact
- Tabla comparativa por carrera
- ROI cards con featured variant
- Métricas destacadas

### 5. Contact
- Formulario con validación
- Cards de información
- Step cards numeradas

---

## 🎯 Requisitos Técnicos Cumplidos

### ✅ Metodología de Estilos
- [x] Aplicación de BEM en toda la interfaz
- [x] Nombres de clases consistentes
- [x] Organización clara y mantenible

### ✅ SASS y Modularización
- [x] Estructura de parciales organizada
- [x] Variables para colores, tipografías y espaciados
- [x] Mixins reutilizables (gradientes, sombras, transiciones)
- [x] Anidamiento para agrupar estilos
- [x] Compilación a CSS final

### ✅ Bootstrap 4
- [x] Sistema de grid responsivo (col-12, col-md-6, col-lg-4)
- [x] Componentes: Navbar, Cards, Buttons, Forms, Tables, Badges
- [x] Incluido vía CDN

### ✅ Modelo de Cajas y Layout
- [x] Header/navbar consistente
- [x] Footer con información del proyecto
- [x] Secciones organizadas
- [x] Responsividad completa

---

## 📊 Impacto Proyectado

| Tipo de Carrera | Deserción Base | Reducción | Nueva Tasa |
|----------------|----------------|-----------|------------|
| Ingenierías | 22% | 8-10% | 12-14% |
| Ciencias Sociales | 28% | 12-15% | 13-16% |
| Carreras de Salud | 15% | 6-8% | 7-9% |
| Pedagogías | 25% | 10-13% | 12-15% |
| Humanidades | 30% | 13-16% | 14-17% |

### ROI Demostrable
- **287%** ROI a 3 años
- **18 meses** punto de equilibrio
- **$27M CLP** recuperación económica promedio

---

## 👥 Autor

**Equipo LearnTrack**
- Proyecto de Título - Técnico en Análisis de Datos
- AIEP - Instituto Profesional
- Noviembre 2025

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico y está disponible bajo la licencia MIT.

---

## 📞 Contacto

- **Email**: contacto@learntrack.cl
- **Web**: www.learntrack.cl
- **Ubicación**: Santiago, Chile

---

## 🙏 Agradecimientos

- AIEP por la formación en Análisis de Datos
- Bootstrap Team por el framework
- SASS Team por el preprocesador
- Font Awesome por los iconos
- Google Fonts por las tipografías

---

## 📝 Notas de Desarrollo

### Commits Descriptivos
```bash
git commit -m "feat: Implementar hero section con glassmorphism"
git commit -m "style: Aplicar BEM a componentes de dashboard"
git commit -m "refactor: Modularizar SASS en parciales"
```

### Próximas Mejoras
- [ ] Integración con API real de datos estudiantiles
- [ ] Gráficos interactivos con Chart.js
- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] Exportación de reportes PDF
- [ ] Modo oscuro/claro

---

**Desarrollado con ❤️ usando SASS, Bootstrap 4 y BEM**
