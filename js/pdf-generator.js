// ============================================
// LEARNTRACK - PDF GENERATOR
// ============================================

(function () {
    'use strict';

    // ==========================================
    // GENERAR REPORTE PDF COMPLETO
    // ==========================================
    window.generatePDFReport = function () {
        try {
            showNotification('📄 Generando reporte PDF...', 'info');

            // Obtener jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Configuración
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            let yPos = 20;

            // ==========================================
            // ENCABEZADO
            // ==========================================

            // Logo/Título
            doc.setFillColor(102, 126, 234); // #667eea
            doc.rect(0, 0, pageWidth, 35, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('LearnTrack Dashboard', pageWidth / 2, 15, { align: 'center' });

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Reporte de Estudiantes en Riesgo', pageWidth / 2, 25, { align: 'center' });

            yPos = 45;

            // ==========================================
            // INFORMACIÓN DEL REPORTE
            // ==========================================

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');

            const fecha = new Date().toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            doc.text(`Fecha de generación: ${fecha}`, 14, yPos);
            yPos += 7;

            // Obtener datos de estudiantes (asumiendo que studentsData está disponible)
            const totalEstudiantes = window.studentsData ? window.studentsData.length : 8;
            const highRisk = window.studentsData ? window.studentsData.filter(s => s.riskLevel === 'high').length : 3;
            const mediumRisk = window.studentsData ? window.studentsData.filter(s => s.riskLevel === 'medium').length : 3;
            const lowRisk = window.studentsData ? window.studentsData.filter(s => s.riskLevel === 'low').length : 2;

            doc.text(`Total de estudiantes monitoreados: ${totalEstudiantes}`, 14, yPos);
            yPos += 10;

            // ==========================================
            // RESUMEN EJECUTIVO
            // ==========================================

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(102, 126, 234);
            doc.text('Resumen Ejecutivo', 14, yPos);
            yPos += 8;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            // Cuadros de resumen
            const boxWidth = 55;
            const boxHeight = 25;
            const boxSpacing = 5;
            let xPos = 14;

            // Riesgo Alto
            doc.setFillColor(255, 110, 127); // #ff6e7f
            doc.roundedRect(xPos, yPos, boxWidth, boxHeight, 3, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(highRisk.toString(), xPos + boxWidth / 2, yPos + 12, { align: 'center' });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Riesgo Alto', xPos + boxWidth / 2, yPos + 20, { align: 'center' });

            // Riesgo Medio
            xPos += boxWidth + boxSpacing;
            doc.setFillColor(250, 112, 154); // #fa709a
            doc.roundedRect(xPos, yPos, boxWidth, boxHeight, 3, 3, 'F');
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(mediumRisk.toString(), xPos + boxWidth / 2, yPos + 12, { align: 'center' });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Riesgo Medio', xPos + boxWidth / 2, yPos + 20, { align: 'center' });

            // Riesgo Bajo
            xPos += boxWidth + boxSpacing;
            doc.setFillColor(67, 233, 123); // #43e97b
            doc.roundedRect(xPos, yPos, boxWidth, boxHeight, 3, 3, 'F');
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text(lowRisk.toString(), xPos + boxWidth / 2, yPos + 12, { align: 'center' });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('Riesgo Bajo', xPos + boxWidth / 2, yPos + 20, { align: 'center' });

            yPos += boxHeight + 15;

            // ==========================================
            // TABLA DE ESTUDIANTES
            // ==========================================

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(102, 126, 234);
            doc.text('Detalle de Estudiantes', 14, yPos);
            yPos += 5;

            // Preparar datos para la tabla
            const tableData = [];

            if (window.studentsData) {
                window.studentsData.forEach(student => {
                    tableData.push([
                        student.id,
                        student.name,
                        student.career,
                        `${student.riskPercentage}%`,
                        student.average.toString(),
                        `${student.attendance}%`
                    ]);
                });
            } else {
                // Datos de ejemplo si no hay studentsData
                tableData.push(
                    ['2024001', 'Juan Pérez González', 'Ing. Civil', '85%', '4.2', '65%'],
                    ['2024002', 'María González Silva', 'Pedagogía', '78%', '4.0', '68%'],
                    ['2024003', 'Carlos Ramírez Torres', 'C. Sociales', '62%', '4.5', '72%'],
                    ['2024004', 'Ana Martínez López', 'Enfermería', '58%', '4.8', '75%'],
                    ['2024005', 'Diego Fernández Rojas', 'Ing. Informática', '35%', '5.2', '85%'],
                    ['2024006', 'Sofía Vargas Muñoz', 'Psicología', '72%', '4.3', '70%'],
                    ['2024007', 'Roberto Sánchez Castro', 'Administración', '55%', '4.6', '78%'],
                    ['2024008', 'Valentina Torres Díaz', 'Derecho', '28%', '5.5', '92%']
                );
            }

            doc.autoTable({
                startY: yPos,
                head: [['ID', 'Nombre', 'Carrera', 'Riesgo', 'Promedio', 'Asistencia']],
                body: tableData,
                theme: 'striped',
                headStyles: {
                    fillColor: [102, 126, 234],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    fontSize: 10
                },
                bodyStyles: {
                    fontSize: 9
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                },
                columnStyles: {
                    0: { cellWidth: 20 },
                    1: { cellWidth: 45 },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 20 },
                    4: { cellWidth: 22 },
                    5: { cellWidth: 25 }
                },
                didParseCell: function (data) {
                    // Colorear columna de riesgo
                    if (data.column.index === 3 && data.section === 'body') {
                        const riskValue = parseInt(data.cell.text[0]);
                        if (riskValue >= 70) {
                            data.cell.styles.textColor = [255, 110, 127];
                            data.cell.styles.fontStyle = 'bold';
                        } else if (riskValue >= 50) {
                            data.cell.styles.textColor = [250, 112, 154];
                            data.cell.styles.fontStyle = 'bold';
                        } else {
                            data.cell.styles.textColor = [67, 233, 123];
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }
                }
            });

            yPos = doc.lastAutoTable.finalY + 15;

            // ==========================================
            // RECOMENDACIONES
            // ==========================================

            // Verificar si necesitamos una nueva página
            if (yPos > pageHeight - 60) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(102, 126, 234);
            doc.text('Recomendaciones', 14, yPos);
            yPos += 8;

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);

            const recomendaciones = [
                `• Priorizar intervención en ${highRisk} estudiantes de riesgo alto`,
                '• Implementar tutorías personalizadas para estudiantes con asistencia < 70%',
                '• Monitorear semanalmente el progreso de estudiantes en riesgo medio',
                '• Mantener seguimiento de estudiantes de bajo riesgo para prevención',
                '• Coordinar con directores de carrera para casos críticos'
            ];

            recomendaciones.forEach(rec => {
                if (yPos > pageHeight - 20) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.text(rec, 14, yPos, { maxWidth: pageWidth - 28 });
                yPos += 7;
            });

            // ==========================================
            // PIE DE PÁGINA
            // ==========================================

            const totalPages = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(
                    `Página ${i} de ${totalPages}`,
                    pageWidth / 2,
                    pageHeight - 10,
                    { align: 'center' }
                );
                doc.text(
                    'LearnTrack Dashboard - Sistema Predictivo de Retención Estudiantil',
                    pageWidth / 2,
                    pageHeight - 5,
                    { align: 'center' }
                );
            }

            // ==========================================
            // GUARDAR PDF
            // ==========================================

            const fileName = `LearnTrack_Reporte_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

            showNotification('✅ Reporte PDF generado exitosamente', 'success');
            console.log(`📄 PDF generado: ${fileName}`);

        } catch (error) {
            console.error('❌ Error al generar PDF:', error);
            showNotification('❌ Error al generar PDF', 'danger');
        }
    };

    // ==========================================
    // GENERAR PDF SIMPLE (ALTERNATIVA RÁPIDA)
    // ==========================================
    window.generateSimplePDF = function () {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(20);
            doc.text('LearnTrack - Reporte Simple', 20, 20);

            doc.setFontSize(12);
            doc.text(`Fecha: ${new Date().toLocaleDateString('es-CL')}`, 20, 35);
            doc.text(`Total Estudiantes: ${window.studentsData?.length || 8}`, 20, 45);

            doc.save(`LearnTrack_Simple_${new Date().toISOString().split('T')[0]}.pdf`);
            showNotification('✅ PDF simple generado', 'success');
        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ Error al generar PDF', 'danger');
        }
    };

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {
        console.log('%c PDF Generator Iniciado ', 'background: #ff6e7f; color: white; font-size: 14px; padding: 5px;');
    });

})();
