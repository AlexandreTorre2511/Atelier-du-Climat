/* Atelier du Climat — Main JS */

// ── Mesure d'audience : Cloudflare Web Analytics ──
// À CHANGER : coller ici le token du site, trouvé dans le tableau de bord
// Cloudflare → Analytics & Logs → Web Analytics → Manage site. C'est le
// seul endroit à modifier : ce fichier est chargé par les 28 pages.
// Tant que le token est vide, rien n'est chargé et rien n'est mesuré.
// Cet outil ne pose aucun cookie : ne pas réintroduire de bandeau de consentement
// sans changer d'abord la section 6 de politique-confidentialite.html.
const CF_ANALYTICS_TOKEN = '';

(function() {
  if (!CF_ANALYTICS_TOKEN) return;
  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
  document.head.appendChild(beacon);
})();

// ── Navbar scroll ──
(function() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── Mobile menu ──
(function() {
  const burger = document.getElementById('burger');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-menu__close');
  if (!burger || !menu) return;
  const basculer = (ouvert) => {
    menu.classList.toggle('open', ouvert);
    burger.setAttribute('aria-expanded', String(ouvert));
    document.body.style.overflow = ouvert ? 'hidden' : '';
    if (ouvert) close?.focus();
  };
  burger.addEventListener('click', () => basculer(true));
  close && close.addEventListener('click', () => basculer(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => basculer(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) basculer(false);
  });
})();

// ── Reveal on scroll ──
// La classe .js n'est posée que si l'observateur existe : sans elle, le CSS
// laisse tout le contenu visible. Un site qui disparaît quand le JS échoue
// est un site qui ne convertit pas.
(function() {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ── Tabs ──
(function() {
  document.querySelectorAll('.tabs__nav').forEach(nav => {
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const container = btn.closest('.product-tabs');
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
})();

// ── Counter animation ──
(function() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

// ── Active nav link ──
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === './') || href === path) {
      a.classList.add('active');
    }
  });
})();

// ── Smooth hero parallax ──
(function() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
  }, { passive: true });
})();
