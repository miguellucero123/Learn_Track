// ============================================
// LEARNTRACK - SIMULADOR PREDICTIVO WHAT-IF (Machine Learning Core)
// ============================================

(function () {
    'use strict';

    let currentStudent = null;

    // Variables base del estudiante
    let baseRiskProb = 0; // 0.0 a 1.0
    let baseAttendance = 0;
    let baseGrade = 0;

    // COEFICIENTES DEL MODELO (Pesos aprendidos teóricos)
    // En un modelo real, estos vienen del entrenamiento en Python (scikit-learn)
    const WEIGHTS = {
        INTERCEPT: 0,      // El sesgo se calcula dinámicamente para ajustar al estudiante
        ATTENDANCE: -0.05, // Coeficiente negativo: Mayor asistencia => Menor riesgo
        GRADE: -0.8        // Coeficiente negativo fuerte: Mayor nota => Menor riesgo drástico
    };

    // FUNCIÓN SIGMOIDE (La curva S estándar en Probabilidades)
    // Convierte un valor 'z' (logit) cualquiera en una probabilidad entre 0 y 1
    function sigmoid(z) {
        return 1 / (1 + Math.exp(-z));
    }

    // FUNCIÓN LOGIT (Inversa de Sigmoide)
    // Nos permite obtener el 'z' original dado un riesgo inicial
    function logit(p) {
        if (p >= 0.999) return 6.9; // Evitar infinito
        if (p <= 0.001) return -6.9; // Evitar menos infinito
        return Math.log(p / (1 - p));
    }

    // Abrir Simulador
    window.openSimulator = function (studentId) {
        const student = window.studentsData.find(s => s.id === studentId);
        if (!student) return;

        // Cerrar modal de detalle
        $('#studentDetailModal').modal('hide');

        currentStudent = student;

        // Obtener valores base
        baseRiskProb = parseFloat(student.riskPercentage) / 100;
        baseAttendance = parseFloat(student.attendance);
        baseGrade = parseFloat(student.average);

        // UI Setup
        document.getElementById('simStudentName').textContent = student.name;
        document.getElementById('simStudentCareer').textContent = student.career;

        // Sliders
        const sliderAttendance = document.getElementById('sliderAttendance');
        sliderAttendance.value = baseAttendance;
        document.getElementById('valAttendance').textContent = baseAttendance + '%';

        const sliderGrade = document.getElementById('sliderGrade');
        sliderGrade.value = baseGrade;
        document.getElementById('valGrade').textContent = baseGrade.toFixed(1);

        updateSimulation(); // Cálculo inicial
        $('#simulationModal').modal('show');
    };

    // CÁLCULO EN TIEMPO REAL
    window.updateSimulation = function () {
        if (!currentStudent) return;

        // 1. Obtener nuevos valores de los inputs
        const currentAttendance = parseFloat(document.getElementById('sliderAttendance').value);
        const currentGrade = parseFloat(document.getElementById('sliderGrade').value);

        // UI Updates
        document.getElementById('valAttendance').textContent = currentAttendance + '%';
        document.getElementById('valGrade').textContent = currentGrade.toFixed(1);

        // 2. CALCULAR DELTAS (Cambios respecto a la base)
        const deltaAttendance = currentAttendance - baseAttendance;
        const deltaGrade = currentGrade - baseGrade;

        // 3. INGENIERÍA DE MODELO (Regresión Logística)
        // Paso A: Recuperar el 'z' (logit) original del estudiante
        const originalZ = logit(baseRiskProb);

        // Paso B: Calcular el impacto en 'z' usando los pesos del modelo
        // Z_nuevo = Z_original + (Peso_A * Cambio_A) + (Peso_G * Cambio_G)
        const zImpact = (WEIGHTS.ATTENDANCE * deltaAttendance) + (WEIGHTS.GRADE * deltaGrade);
        const newZ = originalZ + zImpact;

        // Paso C: Aplicar función de activación Sigmoide para obtener nueva probabilidad
        const newProb = sigmoid(newZ);
        const newRiskPercent = Math.round(newProb * 100);

        // 4. VISUALIZACIÓN DE RESULTADOS
        const riskDisplay = document.getElementById('simNewRisk');
        const progressBar = document.getElementById('simRiskProgress');
        const deltaDisplay = document.getElementById('simRiskDelta');

        riskDisplay.textContent = newRiskPercent + '%';
        progressBar.style.width = newRiskPercent + '%';

        // Colores semafóricos
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';
        if (newRiskPercent < 40) progressBar.classList.add('bg-success');
        else if (newRiskPercent < 70) progressBar.classList.add('bg-warning');
        else progressBar.classList.add('bg-danger');

        // Calcular diferencia visual
        const diff = (baseRiskProb * 100) - newRiskPercent;

        if (diff > 0.5) {
            deltaDisplay.innerHTML = `<i class="fas fa-arrow-down"></i> Probabilidad baja ${Math.round(diff)}%`;
            deltaDisplay.className = 'text-success font-weight-bold ml-2';
        } else if (diff < -0.5) {
            deltaDisplay.innerHTML = `<i class="fas fa-arrow-up"></i> Probabilidad sube ${Math.round(Math.abs(diff))}%`;
            deltaDisplay.className = 'text-danger font-weight-bold ml-2';
        } else {
            deltaDisplay.innerHTML = `<span class="text-muted small">Sin variación significativa (Modelo estable)</span>`;
            deltaDisplay.className = 'text-muted ml-2';
        }

        // Actualizar información técnica del modelo en el footer de la card
        const modelInfo = document.querySelector('.modal-body .small');
        if (modelInfo) {
            modelInfo.innerHTML = `<strong>Modelo:</strong> Regresión Logística (Sigmoide) | <strong>Logit Z:</strong> ${newZ.toFixed(2)}`;
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        // Event Listeners
        const s1 = document.getElementById('sliderAttendance');
        if (s1) s1.addEventListener('input', window.updateSimulation);

        const s2 = document.getElementById('sliderGrade');
        if (s2) s2.addEventListener('input', window.updateSimulation);
    });

})();
