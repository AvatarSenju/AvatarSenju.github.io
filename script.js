const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkElements = navLinks.querySelectorAll('a');
const sections = document.querySelectorAll('main section[id]');

navbar.classList.add('enhanced');

function closeNavigation() {
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
}

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinkElements.forEach(link => {
    link.addEventListener('click', closeNavigation);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        closeNavigation();
        navToggle.focus();
    }
});

window.matchMedia('(max-width: 760px)').addEventListener('change', closeNavigation);

function updateNavigation() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 130) {
            current = section.id;
        }
    });

    navLinkElements.forEach(link => {
        if (link.getAttribute('href') === `#${current}`) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('load', updateNavigation);
updateNavigation();
