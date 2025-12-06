// ============================================
// LEARNTRACK - SIMULADOR PREDICTIVO WHAT-IF
// ============================================

(function () {
    'use strict';

    let currentStudent = null;
    let originalRisk = 0;
    let originalAttendance = 0;
    let originalGrades = 0;

    // Abrir Simulador para un estudiante
    window.openSimulator = function (studentId) {
        // Encontrar estudiante (usando window.studentsData de app-funcional.js)
        const student = window.studentsData.find(s => s.id === studentId);
        if (!student) {
            console.error('Estudiante no encontrado:', studentId);
            return;
        }

        // Cerrar modal de detalle si está abierto
        $('#studentDetailModal').modal('hide');

        currentStudent = student;

        // Convertir riesgo "Alto - 85%" a número 85
        originalRisk = parseFloat(student.riskPercentage);
        originalAttendance = parseFloat(student.attendance);
        originalGrades = parseFloat(student.average);

        // Llenar Modal con datos iniciales
        document.getElementById('simStudentName').textContent = student.name;
        document.getElementById('simStudentCareer').textContent = student.career;

        // Configurar Sliders
        const sliderAttendance = document.getElementById('sliderAttendance');
        const valAttendance = document.getElementById('valAttendance');
        sliderAttendance.value = originalAttendance;
        valAttendance.textContent = originalAttendance + '%';

        const sliderGrade = document.getElementById('sliderGrade');
        const valGrade = document.getElementById('valGrade');
        sliderGrade.value = originalGrades;
        valGrade.textContent = originalGrades.toFixed(1);

        // Resetear visualización
        updateSimulation();

        // Mostrar Modal
        $('#simulationModal').modal('show');
    };

    // Función de cálculo en tiempo real
    window.updateSimulation = function () {
        if (!currentStudent) return;

        const newAttendance = parseFloat(document.getElementById('sliderAttendance').value);
        const newGrade = parseFloat(document.getElementById('sliderGrade').value);

        // Actualizar etiquetas de valores
        document.getElementById('valAttendance').textContent = newAttendance + '%';
        document.getElementById('valGrade').textContent = newGrade.toFixed(1);

        // LÓGICA PREDICTIVA SIMULADA (Heurística)
        // 1. Mejora en asistencia: Por cada 1% que sube sobre el original, el riesgo baja 0.5%
        const attendanceDelta = newAttendance - originalAttendance;
        const riskReductionAttendance = attendanceDelta * 0.8;

        // 2. Mejora en notas: Por cada 0.1 que sube, el riesgo baja 2%
        const gradeDelta = newGrade - originalGrades;
        const riskReductionGrade = (gradeDelta * 10) * 2.5;

        // Calcular nuevo riesgo
        let newRisk = originalRisk - (riskReductionAttendance + riskReductionGrade);

        // Límites (0-100)
        newRisk = Math.max(5, Math.min(99, newRisk));

        // Actualizar UI del Resultado
        const riskDisplay = document.getElementById('simNewRisk');
        const progressBar = document.getElementById('simRiskProgress');
        const deltaDisplay = document.getElementById('simRiskDelta');

        riskDisplay.textContent = Math.round(newRisk) + '%';
        progressBar.style.width = newRisk + '%';

        // Colores dinámicos
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';
        if (newRisk < 40) progressBar.classList.add('bg-success');
        else if (newRisk < 70) progressBar.classList.add('bg-warning');
        else progressBar.classList.add('bg-danger');

        // Mostrar cambio
        const riskChange = originalRisk - newRisk;
        if (riskChange > 0) {
            deltaDisplay.innerHTML = `<i class="fas fa-arrow-down"></i> Disminuye ${Math.round(riskChange)}%`;
            deltaDisplay.className = 'text-success font-weight-bold ml-2';
        } else if (riskChange < 0) {
            deltaDisplay.innerHTML = `<i class="fas fa-arrow-up"></i> Aumenta ${Math.round(Math.abs(riskChange))}%`;
            deltaDisplay.className = 'text-danger font-weight-bold ml-2';
        } else {
            deltaDisplay.innerHTML = `<span class="text-muted">Sin cambios</span>`;
        }
    };

    // Inicialización de Event Listeners cuando el DOM está listo
    document.addEventListener('DOMContentLoaded', function () {
        // Asignar eventos a los sliders si existen
        const s1 = document.getElementById('sliderAttendance');
        if (s1) s1.addEventListener('input', window.updateSimulation);

        const s2 = document.getElementById('sliderGrade');
        if (s2) s2.addEventListener('input', window.updateSimulation);
    });

})();
