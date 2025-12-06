// ============================================
// APLICACIÓN FUNCIONAL - LearnTrack Dashboard
// ============================================

(function () {
    'use strict';

    // ==========================================
    // NAVEGACIÓN ENTRE SECCIONES - CORE FUNCTION
    // ==========================================
    window.showSection = function (sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Actualizar nav links activos
        document.querySelectorAll('.learntrack-header__link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Cargar contenido específico
        if (sectionId === 'students') {
            if (typeof renderStudentCards === 'function') renderStudentCards();
        } else if (sectionId === 'reports') {
            if (typeof renderCharts === 'function') renderCharts();
            // Integración con Advanced Features
            if (typeof window.renderTrendChart === 'function') {
                setTimeout(window.renderTrendChart, 100);
            }
        } else if (sectionId === 'settings') {
            if (typeof initializeSettings === 'function') initializeSettings();
        }

        showNotification(`Navegando a: ${getSectionName(sectionId)}`, 'info');
    };

    function getSectionName(sectionId) {
        const names = {
            'dashboard': 'Dashboard',
            'students': 'Estudiantes',
            'reports': 'Reportes',
            'settings': 'Configuración'
        };
        return names[sectionId] || sectionId;
    }

    // ==========================================
    // DATOS DE ESTUDIANTES (Simulados)
    // ==========================================
    window.studentsData = [
        {
            id: '2024001',
            name: 'Juan Pérez González',
            career: 'Ingeniería Civil',
            riskLevel: 'high',
            riskPercentage: 85,
            average: 4.2,
            attendance: 65,
            factors: [
                { name: 'Asistencia < 70%', impact: 30, level: 'high' },
                { name: 'Promedio < 4.5', impact: 25, level: 'high' },
                { name: 'Sin tutoría', impact: 15, level: 'medium' }
            ],
            interventions: []
        },
        {
            id: '2024002',
            name: 'María González Silva',
            career: 'Pedagogía',
            riskLevel: 'high',
            riskPercentage: 78,
            average: 4.0,
            attendance: 68,
            factors: [
                { name: 'Asistencia < 70%', impact: 28, level: 'high' },
                { name: 'Promedio < 4.5', impact: 22, level: 'high' },
                { name: 'Primera generación', impact: 18, level: 'medium' }
            ],
            interventions: []
        },
        {
            id: '2024003',
            name: 'Carlos Ramírez Torres',
            career: 'Ciencias Sociales',
            riskLevel: 'medium',
            riskPercentage: 62,
            average: 4.5,
            attendance: 72,
            factors: [
                { name: 'Bajo compromiso', impact: 20, level: 'medium' },
                { name: 'Falta motivación', impact: 15, level: 'medium' }
            ],
            interventions: []
        },
        {
            id: '2024004',
            name: 'Ana Martínez López',
            career: 'Enfermería',
            riskLevel: 'medium',
            riskPercentage: 58,
            average: 4.8,
            attendance: 75,
            factors: [
                { name: 'Carga laboral alta', impact: 25, level: 'medium' },
                { name: 'Estrés académico', impact: 18, level: 'medium' }
            ],
            interventions: []
        },
        {
            id: '2024005',
            name: 'Diego Fernández Rojas',
            career: 'Ingeniería Informática',
            riskLevel: 'low',
            riskPercentage: 35,
            average: 5.2,
            attendance: 85,
            factors: [
                { name: 'Buen rendimiento', impact: -20, level: 'low' }
            ],
            interventions: []
        },
        {
            id: '2024006',
            name: 'Sofía Vargas Muñoz',
            career: 'Psicología',
            riskLevel: 'high',
            riskPercentage: 72,
            average: 4.3,
            attendance: 70,
            factors: [
                { name: 'Problemas salud mental', impact: 30, level: 'high' },
                { name: 'Promedio bajo', impact: 22, level: 'high' }
            ],
            interventions: []
        },
        {
            id: '2024007',
            name: 'Roberto Sánchez Castro',
            career: 'Administración',
            riskLevel: 'medium',
            riskPercentage: 55,
            average: 4.6,
            attendance: 78,
            factors: [
                { name: 'Falta organización', impact: 20, level: 'medium' }
            ],
            interventions: []
        },
        {
            id: '2024008',
            name: 'Valentina Torres Díaz',
            career: 'Derecho',
            riskLevel: 'low',
            riskPercentage: 28,
            average: 5.5,
            attendance: 92,
            factors: [
                { name: 'Excelente rendimiento', impact: -25, level: 'low' }
            ],
            interventions: []
        }
    ];

    let currentFilter = 'all';
    let currentStudent = null;

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {
        initializeApp();
        updateKPIs();
        renderStudentsTable();
        setupEventListeners();
        updateLastUpdateTime();

        // Actualizar cada 30 segundos
        setInterval(updateLastUpdateTime, 30000);
    });

    function initializeApp() {
        console.log('%c LearnTrack - Aplicación Funcional ', 'background: #667eea; color: white; font-size: 16px; padding: 8px;');
        console.log('Sistema iniciado correctamente');
        console.log(`Estudiantes monitoreados: ${studentsData.length}`);
    }

    // ==========================================
    // VISUALIZACIÓN DE ESTUDIANTES (CARDS)
    // ==========================================
    window.renderStudentCards = function () {
        const container = document.getElementById('studentsCardContainer');
        if (!container) return; // Si no estamos en la sección de estudiantes

        container.innerHTML = '';

        // Filtrado básico para demo (en producción usaría searchStudent)
        const filtered = studentsData;

        if (filtered.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No se encontraron estudiantes</p></div>';
            return;
        }

        filtered.forEach(student => {
            const badgeClass = student.riskLevel === 'high' ? 'danger' : student.riskLevel === 'medium' ? 'warning' : 'success';

            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            card.innerHTML = `
                <div class="data-table-card" style="height: 100%;">
                    <div class="data-table-card__body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="mb-0">${student.name}</h5>
                            <span class="badge badge-${badgeClass}">${student.riskPercentage}%</span>
                        </div>
                        <p class="text-muted mb-2"><i class="fas fa-id-card"></i> ${student.id}</p>
                        <p class="text-muted mb-2"><i class="fas fa-graduation-cap"></i> ${student.career}</p>
                        <hr>
                        <div class="row text-center">
                            <div class="col-6">
                                <small class="text-muted">Promedio</small>
                                <h6>${student.average}</h6>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Asistencia</small>
                                <h6>${student.attendance}%</h6>
                            </div>
                        </div>
                        <hr>
                        <div class="d-flex text-center" style="gap: 10px;">
                            <button class="btn btn-sm btn-info flex-fill" onclick="viewStudentDetail('${student.id}')">
                                <i class="fas fa-eye"></i> Ver
                            </button>
                            <button class="btn btn-sm btn-warning flex-fill" onclick="sendAlert('${student.id}')">
                                <i class="fas fa-bell"></i> Alerta
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // ==========================================
    // ACTUALIZAR KPIs
    // ==========================================
    function updateKPIs() {
        if (!document.getElementById('riskChange')) return;

        const highRisk = studentsData.filter(s => s.riskLevel === 'high').length;
        const mediumRisk = studentsData.filter(s => s.riskLevel === 'medium').length;
        const totalRisk = highRisk + mediumRisk;
        const pendingAlerts = studentsData.filter(s => s.interventions.length === 0 && s.riskLevel !== 'low').length;

        animateValue('totalRisk', 0, totalRisk, 1000);
        animateValue('pendingAlerts', 0, pendingAlerts, 1000);

        // Valores estáticos simulados
        animateValue('successfulInterventions', 0, 180, 1500);

        document.getElementById('riskChange').textContent = '8%';
        document.getElementById('interventionRate').textContent = '12%';
        document.getElementById('economicRecovery').textContent = '$27M';
        document.getElementById('totalStudents').textContent = studentsData.length;
    }

    function animateValue(id, start, end, duration) {
        const element = document.getElementById(id);
        if (!element) return;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        const timer = setInterval(function () {
            current += increment;
            element.textContent = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // ==========================================
    // RENDERIZAR TABLA DASHBOARD
    // ==========================================
    function renderStudentsTable() {
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        // Usar filtro actual
        const filteredStudents = currentFilter === 'all'
            ? studentsData.slice(0, 5) // Solo mostrar top 5 en dashboard
            : studentsData.filter(s => s.riskLevel === currentFilter).slice(0, 5);

        filteredStudents.forEach(student => {
            const tr = createStudentRow(student);
            tbody.appendChild(tr);
        });
    }

    function createStudentRow(student) {
        const tr = document.createElement('tr');
        tr.className = 'student-row';
        tr.dataset.studentId = student.id;

        const badgeClass = student.riskLevel === 'high' ? 'badge-danger' :
            (student.riskLevel === 'medium' ? 'badge-warning' : 'badge-success');

        const badgeText = student.riskLevel === 'high' ? 'Alto' :
            (student.riskLevel === 'medium' ? 'Medio' : 'Bajo');

        tr.innerHTML = `
            <td>${student.id}</td>
            <td><strong>${student.name}</strong></td>
            <td>${student.career}</td>
            <td><span class="badge ${badgeClass}">${badgeText} - ${student.riskPercentage}%</span></td>
            <td>${student.average}</td>
            <td>${student.attendance}%</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewStudentDetail('${student.id}')" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        return tr;
    }

    // ==========================================
    // DETALLE ESTUDIANTE (MODAL)
    // ==========================================
    window.viewStudentDetail = function (studentId) {
        const student = studentsData.find(s => s.id === studentId);
        if (!student) return;

        currentStudent = student;
        const modalBody = document.getElementById('studentDetailBody');
        if (!modalBody) return;

        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h5><i class="fas fa-user"></i> Información Personal</h5>
                    <p><strong>ID:</strong> ${student.id}</p>
                    <p><strong>Nombre:</strong> ${student.name}</p>
                    <p><strong>Carrera:</strong> ${student.career}</p>
                </div>
                <div class="col-md-6">
                    <h5><i class="fas fa-chart-line"></i> Métricas</h5>
                    <p><strong>Promedio:</strong> ${student.average}</p>
                    <p><strong>Asistencia:</strong> ${student.attendance}%</p>
                    <p><strong>Riesgo:</strong> ${student.riskPercentage}%</p>
                </div>
            </div>
            <hr>
            <h5><i class="fas fa-brain"></i> Factores de Riesgo</h5>
            ${student.factors.map(f => `
                <div class="d-flex justify-content-between mb-1">
                    <span>${f.name}</span>
                    <span class="badge badge-${f.level === 'high' ? 'danger' : 'warning'}">${f.impact}%</span>
                </div>
            `).join('')}
            <hr>
            <div class="text-right">
                <button class="btn btn-info mr-2" onclick="openSimulator('${student.id}')"><i class="fas fa-robot"></i> Simular Escenarios</button>
                <button class="btn btn-success" onclick="generateIntervention()">Generar Intervención IA</button>
            </div>
        `;

        $('#studentDetailModal').modal('show');
    };

    // ==========================================
    // GRÁFICOS (Chart.js)
    // ==========================================
    window.renderCharts = function () {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js no cargado');
            return;
        }

        renderRiskChart();
        renderCareerChart();
    };

    function renderRiskChart() {
        const ctx = document.getElementById('riskDistributionChart');
        if (!ctx) return;

        const existingChart = Chart.getChart(ctx);
        if (existingChart) existingChart.destroy();

        const high = studentsData.filter(s => s.riskLevel === 'high').length;
        const medium = studentsData.filter(s => s.riskLevel === 'medium').length;
        const low = studentsData.filter(s => s.riskLevel === 'low').length;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Alto Riesgo', 'Riesgo Medio', 'Bajo Riesgo'],
                datasets: [{
                    data: [high, medium, low],
                    backgroundColor: ['#ff6e7f', '#fa709a', '#43e97b'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' }
                },
                cutout: '60%'
            }
        });
    }

    function renderCareerChart() {
        const ctx = document.getElementById('careerDistributionChart');
        if (!ctx) return;

        // Agrupar por carrera
        const careers = {};
        studentsData.forEach(s => {
            careers[s.career] = (careers[s.career] || 0) + 1;
        });

        const existingChart = Chart.getChart(ctx);
        if (existingChart) existingChart.destroy();

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(careers),
                datasets: [{
                    label: 'Estudiantes',
                    data: Object.values(careers),
                    backgroundColor: '#667eea',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    },
                    x: {
                        ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // ==========================================
    // ACCIONES
    // ==========================================
    window.sendAlert = function (studentId) {
        showNotification(`Alerta enviada para estudiante ${studentId}`, 'success');
        $('#studentDetailModal').modal('hide');
    };

    window.generateIntervention = function () {
        showNotification('Generando intervención con IA...', 'info');
        setTimeout(() => {
            showNotification('Intervención generada y guardada', 'success');
        }, 1500);
    };

    window.applyStudentFilters = function () {
        const term = document.getElementById('searchStudent').value.toLowerCase();
        // Lógica simplificada de filtro visual
        const allCards = document.querySelectorAll('#studentsCardContainer > div');
        allCards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if (text.includes(term)) card.style.display = 'block';
            else card.style.display = 'none';
        });
        showNotification('Filtros aplicados', 'info');
    };

    window.refreshData = function () {
        showNotification('Actualizando datos...', 'info');
        setTimeout(() => {
            renderStudentsTable();
            renderStudentCards();
            updateKPIs();
            showNotification('Datos actualizados', 'success');
        }, 800);
    };

    // ==========================================
    // NOTIFICACIONES
    // ==========================================
    window.showNotification = function (message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.style.cssText = `
            position: fixed; top: 100px; right: 20px; z-index: 9999;
            min-width: 300px; padding: 15px; border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
        `;

        // Icono seguro
        let icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-info-circle"></i>';

        notification.innerHTML = `<strong>${icon}</strong> ${message}`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    function setupEventListeners() {
        // Listeners globales si fuese necesario
    }

    function updateLastUpdateTime() {
        const el = document.getElementById('lastUpdate');
        if (el) el.textContent = new Date().toLocaleTimeString();
    }

    // Estilos dinámicos para notificaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

})();
