/* ============================================================
   ACCORDÉONS — services de l'accueil et questions fréquentes
   Un seul volet ouvert à la fois. La hauteur est calculée au
   déploiement plutôt que plafonnée en CSS : une réponse longue
   ne se retrouve jamais coupée.
   ============================================================ */

(function () {
  function monter(racine, selItem, selTete, selCorps, classeOuvert, premierOuvert) {
    const conteneur = document.querySelector(racine);
    if (!conteneur) return;

    const items = [...conteneur.querySelectorAll(selItem)];
    if (!items.length) return;

    const corpsDe = item => item.querySelector(selCorps);
    const teteDe  = item => item.querySelector(selTete);

    function poser(item, ouvert) {
      const corps = corpsDe(item);
      const tete = teteDe(item);
      item.classList.toggle(classeOuvert, ouvert);
      tete.setAttribute('aria-expanded', String(ouvert));
      corps.style.maxHeight = ouvert ? corps.scrollHeight + 'px' : '0px';
    }

    items.forEach((item, k) => {
      teteDe(item).addEventListener('click', () => {
        const dejaOuvert = item.classList.contains(classeOuvert);
        items.forEach(autre => poser(autre, false));
        if (!dejaOuvert) poser(item, true);
      });
      poser(item, premierOuvert && k === 0);
    });

    // Au redimensionnement, la hauteur du volet ouvert change.
    let minuteur;
    window.addEventListener('resize', () => {
      clearTimeout(minuteur);
      minuteur = setTimeout(() => {
        const ouvert = items.find(i => i.classList.contains(classeOuvert));
        if (ouvert) corpsDe(ouvert).style.maxHeight = corpsDe(ouvert).scrollHeight + 'px';
      }, 150);
    });
  }

  monter('#accordeon-services', '.accordeon__item', '.accordeon__tete', '.accordeon__corps',
         'accordeon__item--ouvert', true);
  monter('#faq-liste', '.ciel-faq__item', '.ciel-faq__tete', '.ciel-faq__corps',
         'ciel-faq__item--ouvert', false);
})();
