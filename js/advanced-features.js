// ============================================
// LEARNTRACK - ADVANCED FEATURES MODULE
// Módulo de Mejoras Avanzadas (1-10)
// ============================================

// (function () {
'use strict';

// ==========================================
// 1. DASHBOARD CON ESTADÍSTICAS EN TIEMPO REAL
// ==========================================

let autoUpdateInterval = null;

window.enableRealTimeUpdates = function (intervalSeconds = 30) {
    if (autoUpdateInterval) {
        clearInterval(autoUpdateInterval);
    }

    autoUpdateInterval = setInterval(() => {
        if (document.getElementById('dashboard').style.display !== 'none') {
            updateKPIsWithAnimation();
            updateLastUpdateTime();
            showNotification('📊 Datos actualizados', 'info');
        }
    }, intervalSeconds * 1000);

    console.log(`✅ Actualización automática cada ${intervalSeconds}s`);
};

function updateKPIsWithAnimation() {
    // Simular pequeños cambios en los KPIs
    const kpis = ['totalRisk', 'pendingAlerts', 'successfulInterventions'];

    kpis.forEach(kpiId => {
        const element = document.getElementById(kpiId);
        if (element) {
            const currentValue = parseInt(element.textContent) || 0;
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
            const newValue = Math.max(0, currentValue + change);

            animateValue(element, currentValue, newValue, 1000);

            // Efecto de pulsación
            element.parentElement.parentElement.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                element.parentElement.parentElement.style.animation = '';
            }, 500);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function updateLastUpdateTime() {
    const elements = document.querySelectorAll('#lastUpdate, #systemLastUpdate');
    const now = new Date().toLocaleString('es-CL');
    elements.forEach(el => {
        if (el) el.textContent = now;
    });
}

// ==========================================
// 2. SISTEMA DE NOTIFICACIONES MEJORADO
// ==========================================

const notificationStack = [];
const maxNotifications = 3;

window.showAdvancedNotification = function (message, type = 'info', options = {}) {
    const {
        icon = getIconForType(type),
        duration = 3000,
        sound = false,
        closeable = true
    } = options;

    const notification = createNotificationElement(message, type, icon, closeable);

    // Agregar al stack
    notificationStack.push(notification);
    document.body.appendChild(notification);

    // Posicionar notificaciones
    repositionNotifications();

    // Sonido opcional
    if (sound) {
        playNotificationSound();
    }

    // Auto-remover
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
};

function createNotificationElement(message, type, icon, closeable) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} advanced-notification`;
    notification.innerHTML = `
            <i class="${icon} mr-2"></i>
            <span>${message}</span>
            ${closeable ? '<button class="close-notification">×</button>' : ''}
        `;

    notification.style.cssText = `
            position: fixed;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            max-width: 400px;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;

    if (closeable) {
        notification.querySelector('.close-notification').onclick = () => {
            removeNotification(notification);
        };
    }

    return notification;
}

function repositionNotifications() {
    let topPosition = 100;
    notificationStack.forEach(notif => {
        notif.style.top = `${topPosition}px`;
        topPosition += notif.offsetHeight + 10;
    });
}

function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        const index = notificationStack.indexOf(notification);
        if (index > -1) {
            notificationStack.splice(index, 1);
        }
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
        repositionNotifications();
    }, 300);
}

function getIconForType(type) {
    const icons = {
        success: 'fas fa-check-circle',
        danger: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

function playNotificationSound() {
    try {
        // Crear un beep simple
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;

        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.warn('Audio context error:', e);
    }
}

// ==========================================
// 3. GRÁFICO DE TENDENCIA HISTÓRICA
// ==========================================

window.renderTrendChart = function () {
    const canvas = document.getElementById('trendChart');
    if (!canvas || typeof Chart === 'undefined') {
        console.warn('Canvas o Chart.js no disponible');
        return;
    }

    // Datos simulados de los últimos 6 meses
    const months = ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const highRisk = [7, 6, 4, 5, 3, 3];
    const mediumRisk = [5, 4, 5, 3, 3, 3];
    const lowRisk = [3, 4, 3, 4, 2, 2];

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Riesgo Alto',
                    data: highRisk,
                    borderColor: '#ff6e7f',
                    backgroundColor: 'rgba(255, 110, 127, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Riesgo Medio',
                    data: mediumRisk,
                    borderColor: '#fa709a',
                    backgroundColor: 'rgba(250, 112, 154, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Riesgo Bajo',
                    data: lowRisk,
                    borderColor: '#43e97b',
                    backgroundColor: 'rgba(67, 233, 123, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
};

// ==========================================
// 4. SELECTOR DE TEMA DE COLOR
// ==========================================

const colorThemes = {
    default: {
        primary: '#667eea',
        secondary: '#764ba2',
        danger: '#ff6e7f',
        warning: '#fa709a',
        success: '#43e97b'
    },
    ocean: {
        primary: '#2193b0',
        secondary: '#6dd5ed',
        danger: '#ee0979',
        warning: '#ff6a00',
        success: '#56ab2f'
    },
    sunset: {
        primary: '#f12711',
        secondary: '#f5af19',
        danger: '#c31432',
        warning: '#ff512f',
        success: '#38ef7d'
    },
    forest: {
        primary: '#134e5e',
        secondary: '#71b280',
        danger: '#eb3349',
        warning: '#f45c43',
        success: '#56ab2f'
    }
};

window.applyColorTheme = function (themeName) {
    const theme = colorThemes[themeName];
    if (!theme) {
        console.warn(`Tema ${themeName} no encontrado`);
        return;
    }

    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
    });

    // Guardar preferencia
    saveConfig('ui', { colorTheme: themeName });
    showAdvancedNotification(`Tema "${themeName}" aplicado`, 'success');
};

// ==========================================
// 5. VISTA COMPACTA/EXPANDIDA
// ==========================================

let isCompactView = false;

window.toggleCompactView = function () {
    isCompactView = !isCompactView;
    const container = document.getElementById('studentsCardContainer');

    if (container) {
        container.classList.toggle('compact-view', isCompactView);
    }

    // Guardar preferencia
    saveConfig('ui', { compactView: isCompactView });
    showAdvancedNotification(
        isCompactView ? 'Vista compacta activada' : 'Vista expandida activada',
        'info'
    );

    // Re-renderizar
    if (typeof renderStudentCards === 'function') {
        renderStudentCards();
    }
};

// ==========================================
// 6. BÚSQUEDA AVANZADA CON AUTOCOMPLETADO
// ==========================================

window.initAdvancedSearch = function () {
    const searchInput = document.getElementById('searchStudent');
    if (!searchInput) return;

    // Crear contenedor de sugerencias
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.id = 'searchSuggestions';
    suggestionsDiv.className = 'search-suggestions';
    searchInput.parentElement.appendChild(suggestionsDiv);

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        if (query.length < 2) {
            suggestionsDiv.innerHTML = '';
            suggestionsDiv.style.display = 'none';
            return;
        }

        const matches = window.studentsData.filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.id.toLowerCase().includes(query) ||
            s.career.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length > 0) {
            suggestionsDiv.innerHTML = matches.map(s => `
                    <div class="suggestion-item" onclick="selectSuggestion('${s.id}')">
                        <strong>${highlightMatch(s.name, query)}</strong>
                        <small>${s.career} - ${s.id}</small>
                    </div>
                `).join('');
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.innerHTML = '<div class="suggestion-item">No se encontraron resultados</div>';
            suggestionsDiv.style.display = 'block';
        }
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
};

window.selectSuggestion = function (studentId) {
    const student = window.studentsData.find(s => s.id === studentId);
    if (student) {
        document.getElementById('searchStudent').value = student.name;
        document.getElementById('searchSuggestions').style.display = 'none';
        applyStudentFilters();
    }
};

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// ==========================================
// 7. WIDGET DE RESUMEN RÁPIDO
// ==========================================

window.createQuickSummaryWidget = function () {
    const widget = document.createElement('div');
    widget.id = 'quickSummaryWidget';
    widget.className = 'quick-summary-widget';
    widget.innerHTML = `
            <div class="widget-header">
                <i class="fas fa-chart-bar"></i>
                <span>Resumen</span>
                <button onclick="toggleWidget()" class="btn-minimize">−</button>
            </div>
            <div class="widget-body">
                <div class="widget-stat">
                    <span class="stat-label">Total</span>
                    <span class="stat-value" id="widget-total">8</span>
                </div>
                <div class="widget-stat danger">
                    <span class="stat-label">Alto</span>
                    <span class="stat-value" id="widget-high">3</span>
                </div>
                <div class="widget-stat warning">
                    <span class="stat-label">Medio</span>
                    <span class="stat-value" id="widget-medium">3</span>
                </div>
                <div class="widget-stat success">
                    <span class="stat-label">Bajo</span>
                    <span class="stat-value" id="widget-low">2</span>
                </div>
            </div>
        `;

    widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            min-width: 200px;
        `;

    document.body.appendChild(widget);
    updateQuickSummary();
};

window.toggleWidget = function () {
    const widget = document.getElementById('quickSummaryWidget');
    const body = widget.querySelector('.widget-body');
    const btn = widget.querySelector('.btn-minimize');

    if (body.style.display === 'none') {
        body.style.display = 'flex';
        btn.textContent = '−';
    } else {
        body.style.display = 'none';
        btn.textContent = '+';
    }
};

function updateQuickSummary() {
    if (!window.studentsData) return;

    const high = window.studentsData.filter(s => s.riskLevel === 'high').length;
    const medium = window.studentsData.filter(s => s.riskLevel === 'medium').length;
    const low = window.studentsData.filter(s => s.riskLevel === 'low').length;

    document.getElementById('widget-total').textContent = window.studentsData.length;
    document.getElementById('widget-high').textContent = high;
    document.getElementById('widget-medium').textContent = medium;
    document.getElementById('widget-low').textContent = low;
}

// ==========================================
// 8. ATAJOS DE TECLADO
// ==========================================

window.initKeyboardShortcuts = function () {
    document.addEventListener('keydown', function (e) {
        // Ignorar si está escribiendo en un input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            if (e.key === 'Escape') {
                e.target.blur();
            }
            return;
        }

        // Navegación con números
        if (e.key >= '1' && e.key <= '4') {
            const sections = ['dashboard', 'students', 'reports', 'settings'];
            showSection(sections[parseInt(e.key) - 1]);
            e.preventDefault();
        }

        // Ctrl+F para buscar
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchStudent');
            if (searchInput) {
                showSection('students');
                setTimeout(() => searchInput.focus(), 100);
            }
        }

        // Escape para cerrar modales
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                $(modal).modal('hide');
            });
        }

        // ? para ayuda
        if (e.key === '?') {
            showKeyboardHelp();
        }
    });

    console.log('⌨️ Atajos de teclado activados');
};

function showKeyboardHelp() {
    const helpHTML = `
            <div class="keyboard-help">
                <h5><i class="fas fa-keyboard"></i> Atajos de Teclado</h5>
                <ul>
                    <li><kbd>1</kbd> - Dashboard</li>
                    <li><kbd>2</kbd> - Estudiantes</li>
                    <li><kbd>3</kbd> - Reportes</li>
                    <li><kbd>4</kbd> - Configuración</li>
                    <li><kbd>Ctrl</kbd> + <kbd>F</kbd> - Buscar</li>
                    <li><kbd>Esc</kbd> - Cerrar modales</li>
                    <li><kbd>?</kbd> - Mostrar esta ayuda</li>
                </ul>
            </div>
        `;
    showAdvancedNotification(helpHTML, 'info', { duration: 5000, closeable: true });
}

// ==========================================
// 9. IMPORTAR DATOS DESDE CSV
// ==========================================

window.importCSVData = function (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const csv = e.target.result;
            const lines = csv.split('\n');
            const headers = lines[0].split(',');

            const newStudents = [];
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;

                const values = lines[i].split(',');
                const student = {
                    id: values[0]?.trim(),
                    name: values[1]?.trim(),
                    career: values[2]?.trim(),
                    riskPercentage: parseInt(values[3]) || 0,
                    average: parseFloat(values[4]) || 0,
                    attendance: parseInt(values[5]) || 0,
                    riskLevel: getRiskLevel(parseInt(values[3]) || 0)
                };

                if (student.id && student.name) {
                    newStudents.push(student);
                }
            }

            if (newStudents.length > 0) {
                window.studentsData = [...window.studentsData, ...newStudents];
                showAdvancedNotification(
                    `✅ ${newStudents.length} estudiantes importados`,
                    'success'
                );
                if (typeof renderStudentsTable === 'function') {
                    renderStudentsTable();
                }
            } else {
                showAdvancedNotification('No se encontraron datos válidos', 'warning');
            }
        } catch (error) {
            console.error('Error al importar CSV:', error);
            showAdvancedNotification('Error al procesar el archivo', 'danger');
        }
    };
    reader.readAsText(file);
};

function getRiskLevel(percentage) {
    if (percentage >= 70) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
}

// ==========================================
// 10. MODO DE PRESENTACIÓN
// ==========================================

let presentationMode = false;
let currentSlide = 0;
const slides = ['dashboard', 'students', 'reports', 'settings'];

window.togglePresentationMode = function () {
    presentationMode = !presentationMode;

    if (presentationMode) {
        enterPresentationMode();
    } else {
        exitPresentationMode();
    }
};

function enterPresentationMode() {
    document.body.classList.add('presentation-mode');
    currentSlide = 0;
    showSlide(currentSlide);

    // Agregar controles
    const controls = document.createElement('div');
    controls.id = 'presentationControls';
    controls.innerHTML = `
            <button onclick="previousSlide()" class="btn btn-light">
                <i class="fas fa-chevron-left"></i>
            </button>
            <span id="slideCounter">1 / ${slides.length}</span>
            <button onclick="nextSlide()" class="btn btn-light">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button onclick="togglePresentationMode()" class="btn btn-danger">
                <i class="fas fa-times"></i> Salir
            </button>
        `;
    document.body.appendChild(controls);

    // Navegación con teclado
    document.addEventListener('keydown', handlePresentationKeys);

    showAdvancedNotification('Modo presentación activado. Usa las flechas para navegar', 'info');
}

function exitPresentationMode() {
    document.body.classList.remove('presentation-mode');
    const controls = document.getElementById('presentationControls');
    if (controls) controls.remove();
    document.removeEventListener('keydown', handlePresentationKeys);
    showAdvancedNotification('Modo presentación desactivado', 'info');
}

function handlePresentationKeys(e) {
    if (!presentationMode) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        previousSlide();
    } else if (e.key === 'Escape') {
        togglePresentationMode();
    }
}

window.nextSlide = function () {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
};

window.previousSlide = function () {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
};

function showSlide(index) {
    showSection(slides[index]);
    document.getElementById('slideCounter').textContent = `${index + 1} / ${slides.length}`;
}

// ==========================================
// ESTILOS CSS PARA MEJORAS
// ==========================================

const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .advanced-notification {
            cursor: pointer;
        }
        
        .close-notification {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .close-notification:hover {
            opacity: 1;
        }
        
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        }
        
        .suggestion-item {
            padding: 10px 15px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background 0.2s;
        }
        
        .suggestion-item:hover {
            background: #f8f9fa;
        }
        
        .suggestion-item strong {
            display: block;
            margin-bottom: 4px;
        }
        
        .suggestion-item small {
            color: #6c757d;
        }
        
        .suggestion-item mark {
            background: #fff3cd;
            padding: 2px 4px;
            border-radius: 2px;
        }
        
        .quick-summary-widget {
            animation: slideInUp 0.5s ease;
        }
        
        .widget-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 15px;
            border-radius: 12px 12px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .widget-body {
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .widget-stat {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        
        .widget-stat.danger { border-left: 3px solid #ff6e7f; }
        .widget-stat.warning { border-left: 3px solid #fa709a; }
        .widget-stat.success { border-left: 3px solid #43e97b; }
        
        .stat-value {
            font-size: 20px;
            font-weight: bold;
        }
        
        .btn-minimize {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: background 0.3s;
        }
        
        .btn-minimize:hover {
            background: rgba(255,255,255,0.2);
        }
        
        .presentation-mode {
            overflow: hidden;
        }
        
        .presentation-mode .learntrack-header,
        .presentation-mode .learntrack-footer {
            display: none;
        }
        
        .presentation-mode .learntrack-main {
            padding-top: 0;
        }
        
        #presentationControls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            padding: 15px 25px;
            border-radius: 50px;
            display: flex;
            gap: 15px;
            align-items: center;
            z-index: 10000;
        }
        
        #presentationControls button {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #slideCounter {
            color: white;
            font-weight: bold;
            min-width: 60px;
            text-align: center;
        }
        
        .compact-view .data-table-card {
            margin-bottom: 10px !important;
        }
        
        .compact-view .data-table-card__body {
            padding: 10px !important;
        }
        
        .keyboard-help {
            text-align: left;
        }
        
        .keyboard-help ul {
            list-style: none;
            padding: 0;
            margin: 10px 0 0 0;
        }
        
        .keyboard-help li {
            padding: 5px 0;
        }
        
        kbd {
            background: #f4f4f4;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 2px 6px;
            font-family: monospace;
            font-size: 12px;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
document.head.appendChild(advancedStyles);

// ==========================================
// INICIALIZACIÓN AUTOMÁTICA
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('%c 🚀 Advanced Features Module Cargado ', 'background: #667eea; color: white; font-size: 16px; padding: 10px;');
    console.log('✅ 10 mejoras avanzadas disponibles');

    // Inicializar funcionalidades automáticas
    setTimeout(() => {
        initKeyboardShortcuts();
        initAdvancedSearch();
        createQuickSummaryWidget();
        enableRealTimeUpdates(30);
    }, 1000);
});


