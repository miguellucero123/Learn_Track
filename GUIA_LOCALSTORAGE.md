# 💾 LocalStorage - Guía de Uso

## ✅ Implementación Completada

Se ha implementado un sistema completo de **persistencia de configuración** usando localStorage del navegador.

---

## 🎯 Funcionalidades

### 1. **Guardado Automático**
Toda la configuración se guarda automáticamente en tu navegador:

#### Configuración de Alertas
- ✅ Umbral de riesgo alto (50-100%)
- ✅ Umbral de riesgo medio (30-70%)
- ✅ Frecuencia de actualización
- ✅ Notificaciones por email (on/off)
- ✅ Escalamiento automático (on/off)

#### Configuración del Modelo
- ✅ Modelo activo (Random Forest, XGBoost, etc.)
- ✅ Precisión mínima requerida
- ✅ Factores de riesgo considerados (4 checkboxes)

#### Preferencias de UI
- ✅ Última sección visitada
- ✅ Filtro actual
- ✅ Modo oscuro (preparado para futuro)

---

## 🔧 Cómo Usar

### Guardar Configuración

1. **Ve a la pestaña "Configuración"**
2. **Ajusta los valores** que desees:
   - Mueve los sliders
   - Marca/desmarca checkboxes
   - Selecciona opciones en dropdowns
3. **Haz clic en "Guardar Configuración"**
4. **¡Listo!** Tu configuración se guardó automáticamente

### Cargar Configuración

La configuración se carga automáticamente al:
- ✅ Abrir la aplicación
- ✅ Recargar la página (F5)
- ✅ Volver después de cerrar el navegador

### Exportar Configuración

1. **Ve a "Gestión de Configuración"** (al final de Configuración)
2. **Haz clic en "Exportar Configuración"**
3. **Se descargará un archivo JSON** con toda tu configuración
4. **Nombre del archivo:** `learntrack_config_YYYY-MM-DD.json`

### Importar Configuración

1. **Haz clic en "Importar Configuración"**
2. **Selecciona un archivo JSON** previamente exportado
3. **La página se recargará** con la nueva configuración

### Resetear Configuración

1. **Haz clic en "Resetear Todo"**
2. **Confirma la acción**
3. **La configuración volverá a los valores por defecto**

---

## 📊 Estructura de Datos

La configuración se guarda en este formato:

```json
{
  "alerts": {
    "highRiskThreshold": 70,
    "mediumRiskThreshold": 50,
    "updateFrequency": "daily",
    "emailNotifications": true,
    "autoEscalation": true
  },
  "model": {
    "activeModel": "random_forest",
    "minPrecision": 70,
    "factors": {
      "attendance": true,
      "grades": true,
      "financial": true,
      "social": true
    }
  },
  "ui": {
    "lastSection": "dashboard",
    "darkMode": false,
    "currentFilter": "all"
  }
}
```

---

## 🔑 Clave de Almacenamiento

- **Clave:** `learntrack_config`
- **Ubicación:** localStorage del navegador
- **Persistencia:** Permanente (hasta que se borre el caché del navegador)

---

## 🛠️ Funciones Disponibles

### JavaScript API

```javascript
// Guardar configuración de alertas
saveAlertConfig()

// Cargar configuración de alertas
loadAlertConfig()

// Guardar configuración del modelo
saveModelConfig()

// Cargar configuración del modelo
loadModelConfig()

// Guardar preferencias de UI
saveUIPreferences({ darkMode: true })

// Cargar preferencias de UI
const prefs = loadUIPreferences()

// Exportar configuración
exportConfig()

// Importar configuración
importConfig(file)

// Resetear todo
resetConfig()

// Guardar cualquier sección
saveConfig('alerts', { highRiskThreshold: 80 })

// Cargar toda la configuración
const config = loadConfig()
```

---

## ✨ Características Especiales

### 1. **Valores por Defecto**
Si no hay configuración guardada, se usan valores sensatos por defecto.

### 2. **Validación**
Los valores se validan antes de guardar (rangos, tipos, etc.)

### 3. **Merge Inteligente**
Al cargar, se combinan valores guardados con defaults (por si se agregan nuevas opciones)

### 4. **Manejo de Errores**
Si hay error al guardar/cargar, se muestra notificación y se usan defaults

### 5. **Console Logging**
Todas las operaciones se registran en la consola del navegador (F12)

---

## 🎨 Interfaz de Usuario

### Botones Agregados

En la sección **Configuración**, al final:

| Botón | Color | Función |
|-------|-------|---------|
| **Exportar Configuración** | Verde | Descarga JSON |
| **Importar Configuración** | Azul | Carga desde archivo |
| **Resetear Todo** | Rojo | Vuelve a defaults |

### Feedback Visual

- ✅ **Notificaciones** al guardar/cargar
- ✅ **Confirmación** antes de resetear
- ✅ **Mensajes en consola** para debugging

---

## 🔍 Debugging

### Ver Configuración Actual

Abre la consola del navegador (F12) y escribe:

```javascript
// Ver toda la configuración
console.log(loadConfig())

// Ver solo alertas
console.log(loadConfig().alerts)

// Ver solo modelo
console.log(loadConfig().model)

// Ver localStorage directamente
console.log(localStorage.getItem('learntrack_config'))
```

### Limpiar localStorage

```javascript
// Borrar solo LearnTrack
localStorage.removeItem('learntrack_config')

// Borrar todo el localStorage (¡cuidado!)
localStorage.clear()
```

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge (v4+)
- ✅ Firefox (v3.5+)
- ✅ Safari (v4+)
- ✅ Opera (v10.5+)

### Limitaciones
- **Tamaño máximo:** ~5-10MB (varía por navegador)
- **Solo en el mismo navegador:** No sincroniza entre dispositivos
- **Se borra si:** Usuario limpia caché/datos del sitio

---

## 🚀 Casos de Uso

### 1. **Usuario Regular**
- Configura una vez
- La configuración persiste siempre
- No necesita hacer nada más

### 2. **Cambio de Computadora**
- Exporta configuración en PC1
- Importa configuración en PC2
- ¡Listo!

### 3. **Múltiples Configuraciones**
- Exporta "config_trabajo.json"
- Exporta "config_casa.json"
- Importa según necesidad

### 4. **Backup**
- Exporta configuración periódicamente
- Guarda en la nube (Drive, Dropbox, etc.)
- Restaura si es necesario

---

## ⚠️ Advertencias

### NO se guarda automáticamente:
- ❌ Datos de estudiantes
- ❌ Historial de alertas
- ❌ Intervenciones aplicadas

### SÍ se guarda automáticamente:
- ✅ Configuración de alertas
- ✅ Configuración del modelo
- ✅ Preferencias de UI

---

## 🎯 Próximas Mejoras

### Posibles Extensiones:
1. **Sincronización en la nube** (Firebase, Supabase)
2. **Múltiples perfiles** de configuración
3. **Historial de cambios** (undo/redo)
4. **Configuración por usuario** (con login)
5. **Exportar a otros formatos** (YAML, TOML)

---

## 📞 Soporte

### Si algo no funciona:

1. **Abre la consola** (F12)
2. **Busca errores** en rojo
3. **Verifica que localStorage esté habilitado:**
   ```javascript
   typeof(Storage) !== "undefined"
   ```
4. **Intenta resetear** la configuración

---

## ✅ Checklist de Verificación

- [x] localStorage-manager.js creado
- [x] Script agregado al HTML
- [x] Botones de gestión agregados
- [x] Funciones saveAlertConfig() y saveModelConfig() conectadas
- [x] Exportar/Importar/Resetear funcionando
- [x] Notificaciones implementadas
- [x] Valores por defecto definidos
- [x] Documentación completa

---

**¡Tu configuración ahora persiste entre sesiones!** 🎉

*Última actualización: 06/12/2025 01:20*
