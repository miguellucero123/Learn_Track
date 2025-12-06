// ============================================
// LEARNTRACK - INTEGRATION PATCH
// Conecta paginación con funciones existentes
// ============================================

(function () {
    'use strict';

    // Esperar a que todo esté cargado
    document.addEventListener('DOMContentLoaded', function () {
        console.log('%c Integration Patch Cargado ', 'background: #43e97b; color: white; font-size: 14px; padding: 5px;');

        // ==========================================
        // OVERRIDE: renderStudentCards
        // ==========================================
        window.renderStudentCards = function () {
            if (typeof window.studentsData === 'undefined') {
                console.warn('studentsData no está definido');
                return;
            }

            // Inicializar paginación con todos los estudiantes
            if (typeof initPagination === 'function') {
                initPagination(window.studentsData);
            } else {
                console.error('initPagination no está disponible');
            }
        };

        // ==========================================
        // OVERRIDE: applyStudentFilters
        // ==========================================
        window.applyStudentFilters = function () {
            const searchTerm = document.getElementById('searchStudent')?.value.toLowerCase() || '';
            const careerFilter = document.getElementById('filterCareer')?.value || '';

            if (typeof window.studentsData === 'undefined') {
                console.warn('studentsData no está definido');
                return;
            }

            // Filtrar estudiantes
            const filtered = window.studentsData.filter(student => {
                const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                    student.id.toLowerCase().includes(searchTerm) ||
                    student.career.toLowerCase().includes(searchTerm);
                const matchesCareer = !careerFilter || student.career === careerFilter;
                return matchesSearch && matchesCareer;
            });

            // Inicializar paginación con estudiantes filtrados
            if (typeof initPagination === 'function') {
                initPagination(filtered);

                if (filtered.length === 0) {
                    showNotification('No se encontraron estudiantes', 'warning');
                } else {
                    showNotification(`${filtered.length} estudiante(s) encontrado(s)`, 'info');
                }
            } else {
                console.error('initPagination no está disponible');
            }
        };

        // ==========================================
        // OVERRIDE: showSection para inicializar paginación
        // ==========================================
        const originalShowSection = window.showSection;
        window.showSection = function (sectionId) {
            // Llamar a la función original
            if (typeof originalShowSection === 'function') {
                originalShowSection(sectionId);
            }

            // Si es la sección de estudiantes, inicializar paginación
            if (sectionId === 'students' && typeof window.studentsData !== 'undefined') {
                setTimeout(() => {
                    if (typeof renderStudentCards === 'function') {
                        renderStudentCards();
                    }
                }, 100);
            }
        };

        console.log('✅ Paginación integrada con funciones existentes');
    });

})();
