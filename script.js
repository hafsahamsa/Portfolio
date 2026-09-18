// Scroll progress bar + parallax orbs + sticky topbar state
const progressBar = document.querySelector('.scroll-progress-bar');
const topbar = document.querySelector('.topbar');
const orb1 = document.querySelector('.orb1');
const orb2 = document.querySelector('.orb2');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = progress + '%';
  if (topbar) topbar.classList.toggle('scrolled', scrollTop > 40);

  if (!prefersReducedMotion) {
    if (orb1) orb1.style.transform = `translateY(${scrollTop * 0.15}px)`;
    if (orb2) orb2.style.transform = `translateY(${scrollTop * -0.1}px)`;
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

onScroll();

// Reveal sections as they scroll into view (fires once per element)
const revealTargets = document.querySelectorAll('.fade-up');

if (revealTargets.length) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }
}

// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after tapping a link (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}