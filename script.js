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

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealedElements = new WeakSet();
const activeReveals = new Set();
let revealObserver;

function configureReveals() {
    revealObserver?.disconnect();
    activeReveals.forEach(animation => animation.cancel());
    activeReveals.clear();

    if (motionPreference.matches || typeof window.IntersectionObserver !== 'function' || !Element.prototype.animate) {
        return;
    }

    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            revealObserver.unobserve(entry.target);
            revealedElements.add(entry.target);
            const animation = entry.target.animate([
                { opacity: 0.8, translate: '0 12px' },
                { opacity: 1, translate: '0 0' }
            ], { duration: 450, easing: 'ease-out' });
            activeReveals.add(animation);
            animation.onfinish = animation.oncancel = () => activeReveals.delete(animation);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-heading, .project-card, .ai-workflow, .skill-category, .timeline-item').forEach(element => {
        if (!revealedElements.has(element)) {
            revealObserver.observe(element);
        }
    });
}

motionPreference.addEventListener('change', configureReveals);
configureReveals();
