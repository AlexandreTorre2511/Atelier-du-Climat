/* ============================================================
   FILTRE DE LA GALERIE — page Réalisations
   Les cinq boutons n'étaient branchés sur rien : ils changeaient
   d'aspect au clic sans jamais filtrer quoi que ce soit.
   ============================================================ */

(function () {
  const grille = document.getElementById('gallery-grid');
  if (!grille) return;

  const boutons = document.querySelectorAll('.gallery__filter .filter-btn');
  const cartes  = grille.querySelectorAll('.gallery-item');

  function filtrer(categorie) {
    cartes.forEach(carte => {
      const visible = categorie === 'tous' || carte.dataset.cat === categorie;
      carte.hidden = !visible;
    });
  }

  boutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
      boutons.forEach(b => {
        const actif = b === bouton;
        b.classList.toggle('active', actif);
        b.setAttribute('aria-pressed', actif);
      });
      filtrer(bouton.dataset.filtre);
    });
    bouton.setAttribute('aria-pressed', bouton.classList.contains('active'));
  });
})();
