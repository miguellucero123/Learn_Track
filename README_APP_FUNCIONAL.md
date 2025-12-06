# LearnTrack Dashboard - Aplicación Funcional

## 🎯 Descripción

Esta es la **versión funcional** del LearnTrack Dashboard con **botones ejecutables** y funcionalidad completa. A diferencia de la versión de presentación, esta aplicación incluye:

- ✅ **Datos simulados** de 8 estudiantes
- ✅ **Botones completamente funcionales**
- ✅ **Modales interactivos** con información detallada
- ✅ **Filtros dinámicos** por nivel de riesgo
- ✅ **Sistema de alertas** funcional
- ✅ **Generación de intervenciones con IA**
- ✅ **Exportación de datos** a CSV
- ✅ **Actualización en tiempo real**

---

## 📁 Archivos de la Aplicación Funcional

```
Proyecto_diapo15/
├── app_funcional.html          # Aplicación funcional (USAR ESTE)
├── js/
│   └── app-funcional.js        # Lógica de la aplicación
├── css/
│   └── main.css                # Estilos (compartido)
└── README_APP_FUNCIONAL.md     # Este archivo
```

---

## 🚀 Cómo Usar

### Opción 1: Abrir Directamente
1. Abre `app_funcional.html` en tu navegador
2. ¡Listo! La aplicación cargará automáticamente

### Opción 2: Servidor Local
```bash
# Si tienes Python instalado
python -m http.server 8000

# Luego abre: http://localhost:8000/app_funcional.html
```

---

## ✨ Funcionalidades Implementadas

### 1. **Dashboard Interactivo**
- 4 KPIs con animación de contadores
- Actualización automática de métricas
- Indicadores visuales de cambios

### 2. **Tabla de Estudiantes**
- 8 estudiantes con datos simulados
- Información completa: ID, nombre, carrera, riesgo, promedio, asistencia
- Badges de colores según nivel de riesgo
- Animaciones de entrada suaves

### 3. **Filtros Dinámicos** ⭐
- **Todos**: Muestra todos los estudiantes
- **Riesgo Alto**: Solo estudiantes con riesgo ≥70%
- **Riesgo Medio**: Estudiantes con riesgo 50-69%
- **Riesgo Bajo**: Estudiantes con riesgo <50%

### 4. **Ver Detalles** 👁️
Al hacer clic en el botón "Ver detalles" (ojo):
- Modal con información completa del estudiante
- **SHAP Values**: Factores de riesgo explicados
- Contribución porcentual de cada factor
- Historial de intervenciones

### 5. **Enviar Alerta** 🔔
Al hacer clic en el botón "Enviar alerta" (campana):
- Notificación al Director de Carrera
- Modal de confirmación
- Registro de la intervención
- Actualización de KPIs

### 6. **Generación de Intervenciones con IA** 🤖
Dentro del modal de detalles:
- Botón "Generar Intervención IA"
- 5 recomendaciones personalizadas
- Basadas en factores de riesgo específicos
- Botón para aplicar cada intervención

### 7. **Exportar Datos** 📥
- Botón "Exportar" en la tabla
- Descarga archivo CSV con todos los datos
- Formato: ID, Nombre, Carrera, Riesgo, etc.
- Nombre de archivo con fecha

### 8. **Actualizar Datos** 🔄
- Botón "Actualizar" en la tabla
- Recarga datos y KPIs
- Animación de carga
- Notificación de éxito

---

## 📊 Datos de Estudiantes Simulados

La aplicación incluye 8 estudiantes de ejemplo:

| ID | Nombre | Carrera | Riesgo | Promedio | Asistencia |
|----|--------|---------|--------|----------|------------|
| 2024001 | Juan Pérez González | Ingeniería Civil | 85% (Alto) | 4.2 | 65% |
| 2024002 | María González Silva | Pedagogía | 78% (Alto) | 4.0 | 68% |
| 2024003 | Carlos Ramírez Torres | Ciencias Sociales | 62% (Medio) | 4.5 | 72% |
| 2024004 | Ana Martínez López | Enfermería | 58% (Medio) | 4.8 | 75% |
| 2024005 | Diego Fernández Rojas | Ing. Informática | 35% (Bajo) | 5.2 | 85% |
| 2024006 | Sofía Vargas Muñoz | Psicología | 72% (Alto) | 4.3 | 70% |
| 2024007 | Roberto Sánchez Castro | Administración | 55% (Medio) | 4.6 | 78% |
| 2024008 | Valentina Torres Díaz | Derecho | 28% (Bajo) | 5.5 | 92% |

---

## 🎮 Guía de Uso Paso a Paso

### Paso 1: Ver Dashboard
1. Abre `app_funcional.html`
2. Observa los 4 KPIs animándose
3. Los números suben desde 0 hasta el valor final

### Paso 2: Filtrar Estudiantes
1. Haz clic en "Riesgo Alto"
2. La tabla mostrará solo 3 estudiantes
3. El botón se pondrá azul (activo)
4. Aparecerá una notificación

### Paso 3: Ver Detalle de Estudiante
1. Haz clic en el ícono del ojo 👁️
2. Se abrirá un modal con:
   - Información personal
   - Métricas académicas
   - Factores de riesgo (SHAP)
   - Intervenciones previas

### Paso 4: Generar Intervenciones IA
1. Dentro del modal, haz clic en "Generar Intervención IA"
2. Aparecerán 5 recomendaciones personalizadas
3. Cada una tiene un botón "Aplicar"
4. Al aplicar, se registra la intervención

### Paso 5: Enviar Alerta
1. Haz clic en el ícono de campana 🔔
2. Se abrirá un modal de confirmación
3. La alerta se registra en el sistema
4. Los KPIs se actualizan

### Paso 6: Exportar Datos
1. Haz clic en "Exportar"
2. Se descargará un archivo CSV
3. Nombre: `learntrack_estudiantes_YYYY-MM-DD.csv`
4. Contiene todos los datos de la tabla

---

## 🔧 Personalización

### Agregar Más Estudiantes
Edita `js/app-funcional.js`, línea 15:

```javascript
const studentsData = [
    {
        id: '2024009',
        name: 'Nuevo Estudiante',
        career: 'Nueva Carrera',
        riskLevel: 'medium',
        riskPercentage: 60,
        average: 4.5,
        attendance: 75,
        factors: [
            { name: 'Factor 1', impact: 20, level: 'medium' }
        ],
        interventions: []
    },
    // ... más estudiantes
];
```

### Cambiar Colores de Riesgo
Edita `css/main.css`:

```css
.kpi-card--danger {
    border-left-color: #tu-color;
}
```

---

## 🎨 Características Visuales

### Animaciones
- ✨ Contadores animados en KPIs
- ✨ Entrada suave de filas de tabla
- ✨ Highlight de fila al interactuar
- ✨ Modales con fade-in
- ✨ Notificaciones deslizantes

### Colores por Nivel de Riesgo
- 🔴 **Alto**: Rojo (#ff6e7f)
- 🟡 **Medio**: Amarillo (#fa709a)
- 🟢 **Bajo**: Verde (#43e97b)

### Iconos
- 👁️ Ver detalles
- 🔔 Enviar alerta
- 🤖 IA Generativa
- 📥 Exportar
- 🔄 Actualizar
- 🔍 Filtros

---

## 📱 Responsividad

La aplicación es completamente responsiva:

- **Desktop (≥992px)**: 4 columnas de KPIs
- **Tablet (768-991px)**: 2 columnas de KPIs
- **Mobile (≤767px)**: 1 columna de KPIs

---

## 🐛 Solución de Problemas

### Los botones no funcionan
- ✅ Verifica que `js/app-funcional.js` esté cargado
- ✅ Abre la consola del navegador (F12)
- ✅ Busca errores en rojo

### Los estilos no se ven
- ✅ Verifica que `css/main.css` exista
- ✅ Compila SASS si es necesario: `npm run sass`

### Los datos no se cargan
- ✅ Abre la consola (F12)
- ✅ Busca el mensaje: "Sistema iniciado correctamente"
- ✅ Verifica que jQuery esté cargado

---

## 📋 Diferencias con la Versión de Presentación

| Característica | Presentación | Funcional |
|----------------|--------------|-----------|
| Datos | Estáticos (HTML) | Dinámicos (JS) |
| Botones | Decorativos | Ejecutables ✅ |
| Filtros | No | Sí ✅ |
| Modales | No | Sí ✅ |
| Exportar | No | Sí ✅ |
| IA | No | Sí ✅ |
| Alertas | No | Sí ✅ |

---

## 🚀 Próximas Mejoras

- [ ] Integración con API real
- [ ] Base de datos persistente
- [ ] Autenticación de usuarios
- [ ] Gráficos interactivos (Chart.js)
- [ ] Reportes en PDF
- [ ] Notificaciones push
- [ ] Modo oscuro

---

## 📞 Soporte

Para preguntas o problemas:
- Revisa la consola del navegador (F12)
- Verifica que todos los archivos estén presentes
- Asegúrate de tener conexión a internet (CDN)

---

## 🎓 Uso Académico

Esta aplicación fue desarrollada para:
- **Módulo 3**: Diapositiva 15
- **Programa**: Técnico en Análisis de Datos
- **Institución**: AIEP
- **Año**: 2025

---

**¡Disfruta explorando la aplicación funcional de LearnTrack!** 🎉

*Desarrollado con ❤️ usando JavaScript, Bootstrap 4 y SASS*
