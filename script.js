const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const nav = document.getElementById('mainNav');

const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const heroSection = document.getElementById('inicio');

let currentSlide = 0;
let carouselTimer = null;
let touchStartX = 0;

function closeMobileMenu() {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.add('hidden');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
}

function openMobileMenu() {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.remove('hidden');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
}

function toggleMobileMenu() {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === currentSlide);
    });

    indicators.forEach((indicator, indicatorIndex) => {
        const isActive = indicatorIndex === currentSlide;
        indicator.classList.toggle('opacity-100', isActive);
        indicator.classList.toggle('opacity-50', !isActive);
        indicator.setAttribute('aria-label', `Ir a imagen ${indicatorIndex + 1}`);
        indicator.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function startCarousel() {
    if (!slides.length || carouselTimer) return;
    carouselTimer = setInterval(nextSlide, 5000);
}

function stopCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = null;
}

function scrollToAnchor(anchorElement) {
    const id = anchorElement.getAttribute('href');
    if (!id || id === '#' || !id.startsWith('#')) return;
    const target = id ? document.querySelector(id) : null;
    if (!target) return;

    const navHeight = nav ? nav.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

function setupSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    const linkById = new Map();

    navAnchors.forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (href) linkById.set(href, anchor);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const activeHref = `#${entry.target.id}`;
                navAnchors.forEach((anchor) => {
                    anchor.classList.remove('text-red-400', 'font-semibold');
                });

                const activeLinks = Array.from(linkById.entries())
                    .filter(([href]) => href === activeHref)
                    .map(([, element]) => element);

                activeLinks.forEach((activeLink) => {
                    activeLink.classList.add('text-red-400', 'font-semibold');
                });
            });
        },
        {
            rootMargin: '-40% 0px -45% 0px',
            threshold: 0.1,
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function setupRevealAnimation() {
    const revealItems = document.querySelectorAll('.card-hover, #nosotros .grid > div, #testimonios .grid > div');

    revealItems.forEach((item) => {
        item.classList.add('reveal-item');
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterFeedback = document.getElementById('newsletterFeedback');

    if (!newsletterForm || !newsletterEmail || !newsletterFeedback) return;

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = newsletterEmail.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!valid) {
            newsletterFeedback.textContent = 'Introduce un email valido para suscribirte.';
            newsletterFeedback.classList.remove('text-green-400');
            newsletterFeedback.classList.add('text-red-400');
            newsletterEmail.focus();
            return;
        }

        localStorage.setItem('jt_newsletter_email', email);
        newsletterFeedback.textContent = 'Gracias. Te avisaremos de nuevas ofertas muy pronto.';
        newsletterFeedback.classList.remove('text-red-400');
        newsletterFeedback.classList.add('text-green-400');
        newsletterForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

    document.addEventListener('click', (event) => {
        if (!mobileMenu || !menuBtn) return;
        const insideMenu = mobileMenu.contains(event.target);
        const insideButton = menuBtn.contains(event.target);
        if (!insideMenu && !insideButton) closeMobileMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            event.preventDefault();
            scrollToAnchor(anchor);
            closeMobileMenu();
        });
    });

    window.addEventListener('scroll', () => {
        if (!nav) return;
        nav.classList.toggle('shadow-2xl', window.scrollY > 50);
        nav.classList.toggle('is-scrolled', window.scrollY > 10);
    });

    if (slides.length) {
        showSlide(0);
        startCarousel();

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopCarousel();
                startCarousel();
            });
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            previousSlide();
            stopCarousel();
            startCarousel();
        });

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });

        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopCarousel);
            heroSection.addEventListener('mouseleave', startCarousel);
            heroSection.addEventListener('focusin', stopCarousel);
            heroSection.addEventListener('focusout', startCarousel);

            heroSection.addEventListener('touchstart', (event) => {
                touchStartX = event.changedTouches[0].screenX;
            }, { passive: true });

            heroSection.addEventListener('touchend', (event) => {
                const touchEndX = event.changedTouches[0].screenX;
                const delta = touchEndX - touchStartX;
                if (Math.abs(delta) < 35) return;
                if (delta < 0) nextSlide();
                else previousSlide();
                stopCarousel();
                startCarousel();
            }, { passive: true });
        }
    }

    document.querySelectorAll('.card-hover[role="link"]').forEach((card) => {
        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            const href = card.getAttribute('data-href');
            if (href) window.location.href = href;
        });
    });

    setupSectionObserver();
    setupRevealAnimation();
    setupNewsletterForm();
});
