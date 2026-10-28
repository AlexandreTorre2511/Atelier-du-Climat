# PROMPT 01 — Design system

---

Phase 1 : le design system.

Adapte `site/assets/css/style.css` à mon identité :

1. **Les 6 variables de couleur** dans `:root` :
   - `--brand-dark` : ma couleur foncée (fonds sombres, titres)
   - `--brand-darker` : une version plus sombre de la précédente (−40 % de luminosité)
   - `--brand` : ma couleur d'accent (boutons, liens, chiffres)
   - `--brand-light` : accent éclairci (+30 %)
   - `--brand-dim` : accent assombri (−25 %), pour les survols
   - `--brand-glow` : accent à 12 % d'opacité, pour les halos

2. **Les polices** — change le `@import` Google Fonts en haut du fichier et les variables
   `--font-head` / `--font-body`. Choisis un couple cohérent avec l'ambiance de mon BRIEF,
   et explique-moi en une ligne pourquoi.

3. **Vérifie les contrastes** : texte sur fond foncé et texte sur fond accent doivent
   atteindre au moins 4,5:1. Si ça ne passe pas, ajuste et dis-le-moi.

4. **Mon logo** : dis-moi où le placer et sous quel nom exact de fichier.
   Si je n'ai pas de logo, crée un logo typographique en SVG inline (nom de l'entreprise
   dans la police de titre, avec un détail graphique simple).

Ensuite, crée une page `site/_apercu-design.html` **qui ne fera pas partie du site final** :
elle affiche côte à côte tous les éléments du design system (couleurs, boutons, titres,
cartes, formulaire, bandeau CTA) pour que je valide le style avant qu'on construise 30 pages.

Ouvre-la dans mon navigateur quand c'est prêt.
