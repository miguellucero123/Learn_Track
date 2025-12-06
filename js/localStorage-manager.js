// ============================================
// LEARNTRACK - LOCAL STORAGE MANAGER
// ============================================

(function () {
    'use strict';

    // Clave para almacenamiento
    const STORAGE_KEY = 'learntrack_config';

    // ==========================================
    // CONFIGURACIÓN POR DEFECTO
    // ==========================================
    const defaultConfig = {
        alerts: {
            highRiskThreshold: 70,
            mediumRiskThreshold: 50,
            updateFrequency: 'daily',
            emailNotifications: true,
            autoEscalation: true
        },
        model: {
            activeModel: 'random_forest',
            minPrecision: 70,
            factors: {
                attendance: true,
                grades: true,
                financial: true,
                social: true
            }
        },
        ui: {
            lastSection: 'dashboard',
            darkMode: false,
            currentFilter: 'all'
        }
    };

    // ==========================================
    // GUARDAR CONFIGURACIÓN
    // ==========================================
    window.saveConfig = function (section, data) {
        try {
            const config = loadConfig();
            config[section] = { ...config[section], ...data };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
            console.log(`✅ Configuración guardada: ${section}`, data);
            return true;
        } catch (error) {
            console.error('❌ Error al guardar configuración:', error);
            return false;
        }
    };

    // ==========================================
    // CARGAR CONFIGURACIÓN
    // ==========================================
    window.loadConfig = function () {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const config = JSON.parse(stored);
                console.log('✅ Configuración cargada desde localStorage');
                return { ...defaultConfig, ...config };
            }
            console.log('ℹ️ Usando configuración por defecto');
            return defaultConfig;
        } catch (error) {
            console.error('❌ Error al cargar configuración:', error);
            return defaultConfig;
        }
    };

    // ==========================================
    // GUARDAR CONFIGURACIÓN DE ALERTAS
    // ==========================================
    window.saveAlertConfig = function () {
        const alertConfig = {
            highRiskThreshold: parseInt(document.getElementById('highRiskThreshold')?.value) || 70,
            mediumRiskThreshold: parseInt(document.getElementById('mediumRiskThreshold')?.value) || 50,
            updateFrequency: document.getElementById('updateFrequency')?.value || 'daily',
            emailNotifications: document.getElementById('emailNotifications')?.checked || false,
            autoEscalation: document.getElementById('autoEscalation')?.checked || false
        };

        if (saveConfig('alerts', alertConfig)) {
            showNotification('✅ Configuración de alertas guardada', 'success');
            return true;
        }
        showNotification('❌ Error al guardar configuración', 'danger');
        return false;
    };

    // ==========================================
    // CARGAR CONFIGURACIÓN DE ALERTAS
    // ==========================================
    window.loadAlertConfig = function () {
        const config = loadConfig();
        const alerts = config.alerts;

        // Actualizar valores en el DOM
        const highRiskSlider = document.getElementById('highRiskThreshold');
        const mediumRiskSlider = document.getElementById('mediumRiskThreshold');
        const updateFrequency = document.getElementById('updateFrequency');
        const emailNotif = document.getElementById('emailNotifications');
        const autoEscalation = document.getElementById('autoEscalation');

        if (highRiskSlider) {
            highRiskSlider.value = alerts.highRiskThreshold;
            document.getElementById('highRiskValue').textContent = alerts.highRiskThreshold;
        }

        if (mediumRiskSlider) {
            mediumRiskSlider.value = alerts.mediumRiskThreshold;
            document.getElementById('mediumRiskValue').textContent = alerts.mediumRiskThreshold;
        }

        if (updateFrequency) {
            updateFrequency.value = alerts.updateFrequency;
        }

        if (emailNotif) {
            emailNotif.checked = alerts.emailNotifications;
        }

        if (autoEscalation) {
            autoEscalation.checked = alerts.autoEscalation;
        }

        console.log('✅ Configuración de alertas cargada');
    };

    // ==========================================
    // GUARDAR CONFIGURACIÓN DEL MODELO
    // ==========================================
    window.saveModelConfig = function () {
        const modelConfig = {
            activeModel: document.getElementById('activeModel')?.value || 'random_forest',
            minPrecision: parseInt(document.getElementById('minPrecision')?.value) || 70,
            factors: {
                attendance: document.getElementById('factor_attendance')?.checked || false,
                grades: document.getElementById('factor_grades')?.checked || false,
                financial: document.getElementById('factor_financial')?.checked || false,
                social: document.getElementById('factor_social')?.checked || false
            }
        };

        if (saveConfig('model', modelConfig)) {
            showNotification('✅ Configuración del modelo guardada', 'success');
            return true;
        }
        showNotification('❌ Error al guardar configuración', 'danger');
        return false;
    };

    // ==========================================
    // CARGAR CONFIGURACIÓN DEL MODELO
    // ==========================================
    window.loadModelConfig = function () {
        const config = loadConfig();
        const model = config.model;

        // Actualizar valores en el DOM
        const activeModel = document.getElementById('activeModel');
        const minPrecision = document.getElementById('minPrecision');

        if (activeModel) {
            activeModel.value = model.activeModel;
        }

        if (minPrecision) {
            minPrecision.value = model.minPrecision;
        }

        // Factores de riesgo
        if (model.factors) {
            document.getElementById('factor_attendance').checked = model.factors.attendance;
            document.getElementById('factor_grades').checked = model.factors.grades;
            document.getElementById('factor_financial').checked = model.factors.financial;
            document.getElementById('factor_social').checked = model.factors.social;
        }

        console.log('✅ Configuración del modelo cargada');
    };

    // ==========================================
    // GUARDAR PREFERENCIAS DE UI
    // ==========================================
    window.saveUIPreferences = function (preferences) {
        return saveConfig('ui', preferences);
    };

    // ==========================================
    // CARGAR PREFERENCIAS DE UI
    // ==========================================
    window.loadUIPreferences = function () {
        const config = loadConfig();
        return config.ui;
    };

    // ==========================================
    // RESETEAR CONFIGURACIÓN
    // ==========================================
    window.resetConfig = function () {
        if (confirm('¿Estás seguro de que quieres resetear toda la configuración?')) {
            localStorage.removeItem(STORAGE_KEY);
            showNotification('🔄 Configuración reseteada', 'info');
            location.reload();
        }
    };

    // ==========================================
    // EXPORTAR CONFIGURACIÓN
    // ==========================================
    window.exportConfig = function () {
        const config = loadConfig();
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `learntrack_config_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        showNotification('📥 Configuración exportada', 'success');
    };

    // ==========================================
    // IMPORTAR CONFIGURACIÓN
    // ==========================================
    window.importConfig = function (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const config = JSON.parse(e.target.result);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
                showNotification('📤 Configuración importada', 'success');
                location.reload();
            } catch (error) {
                showNotification('❌ Error al importar configuración', 'danger');
            }
        };
        reader.readAsText(file);
    };

    // ==========================================
    // INICIALIZAR AL CARGAR
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {
        console.log('%c LocalStorage Manager Iniciado ', 'background: #43e97b; color: white; font-size: 14px; padding: 5px;');

        // Cargar configuración guardada
        const config = loadConfig();
        console.log('Configuración actual:', config);
    });

})();
