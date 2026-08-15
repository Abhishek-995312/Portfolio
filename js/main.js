// ==========================================================================
// Nav: scrolled state + mobile toggle
// ==========================================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ==========================================================================
// Active nav link + reveal-on-scroll (with fallback for no IntersectionObserver)
// ==========================================================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Older browsers without IntersectionObserver: just show everything.
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ==========================================================================
// Hero flow — sequential lighting animation
// ==========================================================================
const flowSteps = document.querySelectorAll('#heroFlow .flow-step');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (flowSteps.length) {
  if (prefersReducedMotion) {
    flowSteps.forEach(step => step.classList.add('lit'));
  } else {
    let i = 0;
    const lightNext = () => {
      flowSteps.forEach(s => s.classList.remove('lit'));
      flowSteps[i].classList.add('lit');
      i = (i + 1) % flowSteps.length;
    };
    lightNext();
    setInterval(lightNext, 1400);
  }
}
