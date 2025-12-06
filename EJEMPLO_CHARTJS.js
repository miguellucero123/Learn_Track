< !--Agregar Chart.js al HTML-- >
< !--En app_funcional.html, antes del cierre de </body > -->

< !--Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!--Luego en js / app - funcional.js, reemplazar renderCharts() con: -->

    function renderCharts() {
        // Gráfico de Distribución de Riesgo
        const riskCtx = document.getElementById('riskDistributionChart');
        if (riskCtx) {
            new Chart(riskCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Alto', 'Medio', 'Bajo'],
                    datasets: [{
                        data: [3, 3, 2],
                        backgroundColor: ['#ff6e7f', '#fa709a', '#43e97b'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Gráfico de Carreras
        const careerCtx = document.getElementById('careerDistributionChart');
        if (careerCtx) {
            new Chart(careerCtx, {
                type: 'bar',
                data: {
                    labels: ['Ing. Civil', 'Pedagogía', 'C. Sociales', 'Enfermería', 'Informática', 'Psicología', 'Admin', 'Derecho'],
                    datasets: [{
                        label: 'Estudiantes',
                        data: [1, 1, 1, 1, 1, 1, 1, 1],
                        backgroundColor: '#667eea'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
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
        }
    }
