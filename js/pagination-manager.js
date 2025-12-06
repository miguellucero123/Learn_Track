// ============================================
// LEARNTRACK - PAGINATION MANAGER
// ============================================

(function () {
    'use strict';

    // ==========================================
    // CONFIGURACIÓN DE PAGINACIÓN
    // ==========================================
    const paginationConfig = {
        studentsPerPage: 6,
        currentPage: 1,
        totalPages: 1,
        filteredStudents: []
    };

    // ==========================================
    // INICIALIZAR PAGINACIÓN
    // ==========================================
    window.initPagination = function (students) {
        paginationConfig.filteredStudents = students || [];
        paginationConfig.totalPages = Math.ceil(paginationConfig.filteredStudents.length / paginationConfig.studentsPerPage);
        paginationConfig.currentPage = 1;

        updatePaginationUI();
        renderCurrentPage();
    };

    // ==========================================
    // RENDERIZAR PÁGINA ACTUAL
    // ==========================================
    function renderCurrentPage() {
        const container = document.getElementById('studentsCardContainer');
        if (!container) return;

        container.innerHTML = '';

        const startIndex = (paginationConfig.currentPage - 1) * paginationConfig.studentsPerPage;
        const endIndex = startIndex + paginationConfig.studentsPerPage;
        const studentsToShow = paginationConfig.filteredStudents.slice(startIndex, endIndex);

        if (studentsToShow.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-center text-muted">No hay estudiantes para mostrar</p></div>';
            document.getElementById('paginationContainer').style.display = 'none';
            return;
        }

        // Renderizar cards de estudiantes
        studentsToShow.forEach((student, index) => {
            const badgeClass = student.riskLevel === 'high' ? 'danger' : student.riskLevel === 'medium' ? 'warning' : 'success';

            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
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
                        <div class="d-flex gap-2" style="gap: 0.5rem;">
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

            // Animación de entrada
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Mostrar/ocultar paginación
        const paginationContainer = document.getElementById('paginationContainer');
        if (paginationConfig.totalPages > 1) {
            paginationContainer.style.display = 'block';
        } else {
            paginationContainer.style.display = 'none';
        }

        // Scroll suave al inicio de la sección
        const studentsSection = document.getElementById('students');
        if (studentsSection && studentsSection.style.display !== 'none') {
            studentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ==========================================
    // ACTUALIZAR UI DE PAGINACIÓN
    // ==========================================
    function updatePaginationUI() {
        // Actualizar números de página
        document.getElementById('currentPageNum').textContent = paginationConfig.currentPage;
        document.getElementById('totalPagesNum').textContent = paginationConfig.totalPages;

        // Actualizar rango de estudiantes mostrados
        const startIndex = (paginationConfig.currentPage - 1) * paginationConfig.studentsPerPage + 1;
        const endIndex = Math.min(paginationConfig.currentPage * paginationConfig.studentsPerPage, paginationConfig.filteredStudents.length);

        document.getElementById('showingFrom').textContent = startIndex;
        document.getElementById('showingTo').textContent = endIndex;
        document.getElementById('totalStudents').textContent = paginationConfig.filteredStudents.length;

        // Habilitar/deshabilitar botones
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');

        if (paginationConfig.currentPage === 1) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        if (paginationConfig.currentPage === paginationConfig.totalPages) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }

    // ==========================================
    // CAMBIAR DE PÁGINA
    // ==========================================
    window.changePage = function (direction) {
        if (direction === 'prev' && paginationConfig.currentPage > 1) {
            paginationConfig.currentPage--;
        } else if (direction === 'next' && paginationConfig.currentPage < paginationConfig.totalPages) {
            paginationConfig.currentPage++;
        } else if (typeof direction === 'number') {
            paginationConfig.currentPage = Math.max(1, Math.min(direction, paginationConfig.totalPages));
        }

        updatePaginationUI();
        renderCurrentPage();
        showNotification(`Página ${paginationConfig.currentPage} de ${paginationConfig.totalPages}`, 'info');
    };

    // ==========================================
    // IR A PÁGINA ESPECÍFICA
    // ==========================================
    window.goToPage = function (pageNumber) {
        changePage(pageNumber);
    };

    // ==========================================
    // OBTENER CONFIGURACIÓN ACTUAL
    // ==========================================
    window.getPaginationConfig = function () {
        return { ...paginationConfig };
    };

    // ==========================================
    // RESETEAR PAGINACIÓN
    // ==========================================
    window.resetPagination = function () {
        paginationConfig.currentPage = 1;
        updatePaginationUI();
        renderCurrentPage();
    };

    // ==========================================
    // ACTUALIZAR CON NUEVOS ESTUDIANTES
    // ==========================================
    window.updatePaginatedStudents = function (students) {
        initPagination(students);
    };

    // ==========================================
    // OBTENER ESTUDIANTES DE LA PÁGINA ACTUAL
    // ==========================================
    window.getCurrentPageStudents = function () {
        const startIndex = (paginationConfig.currentPage - 1) * paginationConfig.studentsPerPage;
        const endIndex = startIndex + paginationConfig.studentsPerPage;
        return paginationConfig.filteredStudents.slice(startIndex, endIndex);
    };

    // ==========================================
    // CONFIGURAR ESTUDIANTES POR PÁGINA
    // ==========================================
    window.setStudentsPerPage = function (count) {
        paginationConfig.studentsPerPage = Math.max(1, count);
        paginationConfig.totalPages = Math.ceil(paginationConfig.filteredStudents.length / paginationConfig.studentsPerPage);
        paginationConfig.currentPage = 1;
        updatePaginationUI();
        renderCurrentPage();
        showNotification(`Mostrando ${count} estudiantes por página`, 'info');
    };

    // ==========================================
    // AGREGAR ESTILOS PERSONALIZADOS
    // ==========================================
    const style = document.createElement('style');
    style.textContent = `
        .pagination {
            margin-bottom: 1rem;
        }

        .pagination .page-link {
            color: #667eea;
            border-color: #dee2e6;
            transition: all 0.3s ease;
        }

        .pagination .page-link:hover {
            background-color: #667eea;
            border-color: #667eea;
            color: white;
            transform: translateY(-2px);
        }

        .pagination .page-item.active .page-link {
            background-color: #667eea;
            border-color: #667eea;
            color: white;
            cursor: default;
        }

        .pagination .page-item.disabled .page-link {
            color: #6c757d;
            pointer-events: none;
            cursor: not-allowed;
            opacity: 0.5;
        }

        #paginationContainer {
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Animación para cards */
        .data-table-card {
            transition: all 0.3s ease;
        }

        .data-table-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {
        console.log('%c Pagination Manager Iniciado ', 'background: #fa709a; color: white; font-size: 14px; padding: 5px;');
        console.log('Configuración: 6 estudiantes por página');
    });

})();
