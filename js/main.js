// ============================================
// MAIN JAVASCRIPT - LearnTrack Dashboard
// ============================================

(function () {
    'use strict';

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Solo aplicar smooth scroll si no es solo "#"
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Cerrar navbar en móvil después de hacer click
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.learntrack-header__link');

        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);

    // ==========================================
    // FORM VALIDATION & SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener valores del formulario
            const institutionName = document.getElementById('institutionName').value;
            const contactName = document.getElementById('contactName').value;
            const contactEmail = document.getElementById('contactEmail').value;
            const studentCount = document.getElementById('studentCount').value;
            const message = document.getElementById('message').value;

            // Validación básica
            if (!institutionName || !contactName || !contactEmail) {
                showNotification('Por favor, completa todos los campos obligatorios.', 'warning');
                return;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactEmail)) {
                showNotification('Por favor, ingresa un email válido.', 'danger');
                return;
            }

            // Simular envío exitoso
            showNotification('¡Solicitud enviada exitosamente! Nos contactaremos pronto.', 'success');

            // Limpiar formulario
            contactForm.reset();

            // En producción, aquí se enviaría el formulario a un servidor
            console.log('Formulario enviado:', {
                institutionName,
                contactName,
                contactEmail,
                studentCount,
                message
            });
        });
    }

    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.innerHTML = `
      <strong>${type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ'}</strong>
      ${message}
    `;

        // Agregar estilos inline para la notificación
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      max-width: 500px;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease;
    `;

        document.body.appendChild(notification);

        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Iniciar animación de contadores cuando sean visibles
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const value = entry.target.getAttribute('data-value');
                if (value) {
                    animateCounter(entry.target, parseInt(value));
                }
            }
        });
    }, observerOptions);

    // Observar elementos con clase .stat-card__value
    document.querySelectorAll('.stat-card__value').forEach(counter => {
        // Guardar el valor original
        const originalValue = counter.textContent.trim();
        counter.setAttribute('data-value', originalValue.replace(/[^0-9]/g, ''));
        counter.textContent = '0';
        counterObserver.observe(counter);
    });

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
    });

    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Agregar animaciones de entrada a elementos
        const animatedElements = document.querySelectorAll('.hero-section, .section-header, .kpi-card, .feature-card');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c LearnTrack Dashboard ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Sistema Predictivo de Retención Estudiantil ', 'color: #667eea; font-size: 14px; font-weight: bold;');
    console.log('%c Desarrollado con SASS, Bootstrap 4 y BEM ', 'color: #764ba2; font-size: 12px;');

})();
