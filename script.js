document.documentElement.classList.remove('no-js');

// =========================================================
// MENU MOBILE (hambúrguer)
// =========================================================
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

function closeMenu() {
    navbar.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    const isOpen = navbar.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
}

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link (vai para a seção e recolhe)
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Fecha o menu se a tela for redimensionada para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) closeMenu();
    });
}

// =========================================================
// LINK ATIVO CONFORME A SEÇÃO VISÍVEL
// =========================================================
const sections = document.querySelectorAll('main section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// =========================================================
// ANO ATUAL NO RODAPÉ
// =========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================================================
// ANIMAÇÃO DE REVELAÇÃO AO ROLAR (.reveal)
// =========================================================
const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));
}