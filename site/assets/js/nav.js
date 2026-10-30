/* Atelier du Climat — Nav Dropdowns + Recherche interne */
(function () {

  // ── Navbar position: push down when promo banner is present ──
  var navEl = document.getElementById('navbar');
  if (navEl && document.querySelector('.promo-banner')) {
    function setNavTop() {
      navEl.style.top = (window.innerWidth <= 768) ? '56px' : '68px';
    }
    setNavTop();
    window.addEventListener('resize', setNavTop, { passive: true });
  }

  // ── Dropdowns ──
  var drops = document.querySelectorAll('.nav-drop');
  drops.forEach(function (drop) {
    var btn = drop.querySelector('.nav-drop__btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = drop.classList.contains('open');
      drops.forEach(function (d) { d.classList.remove('open'); });
      if (!isOpen) drop.classList.add('open');
    });
  });
  document.addEventListener('click', function () {
    drops.forEach(function (d) { d.classList.remove('open'); });
  });

  // ── Mobile Accordion ──
  document.querySelectorAll('.mobile-acc__trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.closest('.mobile-acc').classList.toggle('open');
    });
  });

  // ── Search ──
  var overlay   = document.getElementById('search-overlay');
  var input     = document.getElementById('search-input');
  var results   = document.getElementById('search-results');
  var openBtn   = document.getElementById('search-btn');
  var closeBtn  = document.getElementById('search-close');

  // ── INDEX DE RECHERCHE INTERNE ──
  // À REMPLIR par Claude : une ligne par page du site.
  // t = titre affiché · s = catégorie/sous-titre · u = URL relative
  var PAGES = [
    { t: 'Accueil', s: 'Page principale', u: 'index.html' },
    { t: 'Contact — devis gratuit', s: 'Contact', u: 'contact.html' },
    { t: 'One Clima — Pack Essentiel', s: 'Offres', u: 'entree-de-gamme.html' },
    { t: 'Bosch — Pack Confort', s: 'Offres', u: 'bosch.html' },
    { t: 'Daikin — Pack Prestige', s: 'Offres', u: 'daikin-premium.html' },
    { t: 'Réalisations', s: 'Photos & projets', u: 'realisations.html' },
    { t: 'Certifications & normes', s: 'Infos', u: 'certifications-climatisation.html' },
    { t: 'Blog — Conseils', s: 'Blog', u: 'blog.html' },
    { t: 'Climatisation Nice', s: 'Ville', u: 'climatisation-nice.html' },
    { t: 'Climatisation Antibes', s: 'Ville', u: 'climatisation-antibes.html' },
    { t: 'Climatisation Cannes', s: 'Ville', u: 'climatisation-cannes.html' },
    { t: 'Climatisation Monaco', s: 'Ville', u: 'climatisation-monaco.html' },
    { t: 'Climatisation Menton', s: 'Ville', u: 'climatisation-menton.html' },
    { t: 'Climatisation Grasse', s: 'Ville', u: 'climatisation-grasse.html' },
    { t: 'Climatisation Sophia Antipolis', s: 'Ville', u: 'climatisation-sophia-antipolis.html' },
    { t: 'Climatisation Cagnes-sur-Mer', s: 'Ville', u: 'climatisation-cagnes-sur-mer.html' },
    { t: 'Quelle climatisation pour un appartement à Nice ?', s: 'Blog', u: 'blog/climatisation-appartement-nice.html' },
    { t: 'Prix installation climatisation dans le 06', s: 'Blog', u: 'blog/prix-installation-climatisation-06.html' },
    { t: 'Mono-split ou bi-split : lequel choisir ?', s: 'Blog', u: 'blog/mono-split-ou-bi-split.html' },
    { t: 'Daikin vs Bosch : quelle marque choisir ?', s: 'Blog', u: 'blog/daikin-vs-bosch.html' },
    { t: 'Entretien climatisation : le guide annuel', s: 'Blog', u: 'blog/entretien-climatisation.html' },
    { t: 'Climatisation réversible : quelles économies ?', s: 'Blog', u: 'blog/climatisation-reversible-economies.html' },
    { t: 'Installation climatisation à Cannes', s: 'Blog', u: 'blog/installation-climatisation-cannes.html' },
    { t: 'Climatisation en location : vos droits', s: 'Blog', u: 'blog/climatisation-location-droits.html' },
    { t: 'Gaz R-32 : le réfrigérant de l\'avenir', s: 'Blog', u: 'blog/gaz-r32-refrigerant-avenir.html' },
    { t: 'Mentions Légales', s: 'Légal', u: 'mentions-legales.html' },
    { t: 'Conditions générales', s: 'Légal', u: 'cgv.html' },
    { t: 'Politique de Confidentialité', s: 'Légal', u: 'politique-confidentialite.html' }
  ];

  function getBase() {
    return window.location.pathname.indexOf('/blog/') !== -1 ? '../' : '';
  }

  function render(q) {
    if (!results) return;
    var base = getBase();
    var hits = q
      ? PAGES.filter(function (p) { return (p.t + ' ' + p.s).toLowerCase().indexOf(q) !== -1; }).slice(0, 8)
      : PAGES.slice(0, 6);
    if (!hits.length) {
      results.innerHTML = '<div class="search-result" style="opacity:.5;cursor:default">Aucun résultat</div>';
      return;
    }
    results.innerHTML = hits.map(function (p) {
      return '<a class="search-result" href="' + base + p.u + '">'
        + '<div class="search-result__title">' + p.t + '</div>'
        + '<div class="search-result__tag">' + p.s + '</div>'
        + '</a>';
    }).join('');
  }

  function openSearch() {
    if (!overlay) return;
    overlay.classList.add('open');
    setTimeout(function () { if (input) input.focus(); }, 60);
    render('');
  }

  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (input) input.value = '';
  }

  if (openBtn) openBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
  if (input) input.addEventListener('input', function () { render(input.value.trim().toLowerCase()); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      drops.forEach(function (d) { d.classList.remove('open'); });
      closeSearch();
    }
  });

})();
