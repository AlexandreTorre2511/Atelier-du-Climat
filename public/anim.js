// Apparition au défilement des pages statiques (villes, blog).
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  var cibles = document.querySelectorAll(".section h2, .intro p, .carte, .puces li, .etapes li, .faq details, .carte-blog, .article > :not(.fil):not(.eyebrow):not(h1), .cta > *, .villes a");
  var observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (!entree.isIntersecting) return;
      entree.target.classList.add("visible");
      observateur.unobserve(entree.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  cibles.forEach(function (el) {
    var rang = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty("--delai", Math.min(rang, 5) * 70 + "ms");
    el.classList.add("apparition");
    observateur.observe(el);
  });
})();
