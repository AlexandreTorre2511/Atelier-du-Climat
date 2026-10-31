// Apparition au défilement des pages statiques (villes, blog).
// Tout ce qui est passé au-dessus du bas de l'écran apparaît, même après un saut d'ancre.
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var enAttente = Array.prototype.slice.call(document.querySelectorAll(".section h2, .intro p, .carte, .puces li, .etapes li, .faq details, .carte-blog, .article > :not(.fil):not(.eyebrow):not(h1), .cta > *, .villes a"));
  enAttente.forEach(function (el) {
    var rang = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty("--delai", Math.min(rang, 5) * 70 + "ms");
    el.classList.add("apparition");
  });
  var image = 0;
  function verifier() {
    image = 0;
    var seuil = innerHeight * 0.92;
    enAttente = enAttente.filter(function (el) {
      if (el.getBoundingClientRect().top > seuil) return true;
      el.classList.add("visible");
      return false;
    });
    if (!enAttente.length) removeEventListener("scroll", planifier);
  }
  function planifier() { if (!image) image = requestAnimationFrame(verifier); }
  addEventListener("scroll", planifier, { passive: true });
  addEventListener("resize", planifier);
  verifier();
})();
