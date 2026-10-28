# PROMPT 03 — Les 3 pages d'offres

---

Phase 3 : une page par offre (3 pages).

Ce sont les pages qui **transforment**. Le visiteur qui arrive là est déjà intéressé :
il veut les détails et une raison de ne pas aller voir ailleurs.

Structure de chaque page :

1. **Hero de page** (`.page-hero`) : nom de l'offre, prix « à partir de », 1 phrase de promesse
2. **Bloc produit/service en 2 colonnes** : photo à gauche, à droite le nom, le prix,
   4 à 6 caractéristiques (`.product-feat`), et le bouton {{MOT_CONVERSION}}
3. **Onglets** (`.product-tabs`) : *Description détaillée* · *Ce qui est inclus* ·
   *Caractéristiques techniques* · *Garantie*
4. **Tableau comparatif des 3 offres** — avec l'offre de la page surlignée.
   C'est le bloc qui fait monter en gamme : le visiteur voit ce qu'il gagne pour 300 € de plus.
5. **« Pour qui cette offre est faite »** — et surtout **pour qui elle ne l'est pas**.
   Dire honnêtement « si vous avez besoin de X, prenez plutôt l'offre Y » crée plus de
   confiance que n'importe quel argument de vente.
6. **FAQ** — 4 questions spécifiques à cette offre, + le JSON-LD `FAQPage` correspondant
7. **Bandeau CTA** + footer

Règles :
- Chaque page cible un mot-clé différent (nom de l'offre + métier + ville principale)
- Les prix doivent être **cohérents** entre : cette page, les cartes de la page d'accueil,
  le calculateur, et le menu déroulant de la navbar. Vérifie les 4 à la fin.
- Si une caractéristique technique n'est pas dans mon BRIEF, écris
  `{{À COMPLÉTER : …}}` plutôt que de l'inventer. Les clients lisent ces tableaux.

À la fin : mets à jour `sitemap.xml` et le tableau `PAGES` de `nav.js`.
