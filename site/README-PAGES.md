# README-PAGES — les 10 pages réelles du kit

Ce dossier contient maintenant **le vrai code HTML** d'un site en production
(climatisation), avec les noms de marque remplacés par des `{{VARIABLES}}`.

Ce n'est plus seulement des instructions (`SNIPPETS.md`, les `PROMPT-0X.md`) :
ce sont les **pages elles-mêmes**, prêtes à être adaptées plutôt que reconstruites.

## Les 10 fichiers, et ce qu'il faut en faire

| Fichier | Ce que c'est | Ce qu'il faut faire |
|---|---|---|
| `index.html` | La page d'accueil complète, les 15 blocs | Adapter le contenu, garder 1 seul exemplaire |
| `contact.html` | Page contact + formulaire fonctionnel | Adapter le contenu, garder 1 seul exemplaire |
| `blog.html` | Page liste du blog | Adapter, garder 1 seul exemplaire |
| `realisations.html` | Galerie de réalisations | Adapter, garder 1 seul exemplaire |
| `mentions-legales.html` | Mentions légales | Remplir avec les vraies infos, garder 1 seul exemplaire |
| `politique-confidentialite.html` | RGPD | Vérifier les sous-traitants réels, garder 1 seul exemplaire |
| `offre-template.html` | **Modèle** d'une page d'offre | **Dupliquer 3 fois** (entrée / milieu / premium), renommer chaque copie |
| `ville-template.html` | **Modèle** d'une page ville | **Dupliquer une fois par ville** réellement desservie, renommer chaque copie |
| `page-autorite-template.html` | **Modèle** de page d'autorité (ici : certifications) | Adapter au sujet qui a du sens dans le métier (aides, normes, garanties…), dupliquer si besoin de 2 pages |
| `blog/article-comparatif-template.html` | **Modèle** d'article de blog (format comparatif) | **Dupliquer pour chaque article** (10-12), varier les angles (voir PROMPT-05) |

## Ce qui a été fait pour vous

- Toutes les identités (nom, domaine, email, téléphone, GA4 ID) → `{{VARIABLES}}`
- Les 8 villes → `{{VILLE_1}}` à `{{VILLE_8}}` (et les slugs de fichiers associés)
- Les 3 offres → `{{OFFRE_1}}`, `{{OFFRE_2}}`, `{{OFFRE_3}}`
- Le mot "devis" → `{{MOT_CONVERSION}}` (remplacer par le mot qui va à votre métier :
  devis, rendez-vous, consultation, réservation, estimation…)
- Le mot "climatisation"/"clim" → `{{service}}` / `{{service_court}}`
- Un seul `<h1>` vérifié sur chacune des 10 pages
- Toutes les variables CSS inline (`var(--navy)`, `var(--azure)`…) alignées sur
  le design system déjà renommé dans `assets/css/style.css`

## Ce qui reste volontairement tel quel

- **Les textes courants** (accroches, FAQ, avis, paragraphes de blog) sont ceux
  du site d'origine, sur le thème climatisation. Ils servent d'**exemple de ton
  et de structure** — à réécrire avec le vrai métier et les vraies informations
  du `BRIEF-A-REMPLIR.md`. Ne jamais les laisser tels quels dans un site publié.
- **Les prix affichés** (899 €, 1 199 €…) sont des exemples illustratifs,
  à remplacer partout par les vrais prix (voir la règle de cohérence dans
  `CLAUDE.md` : les prix doivent être identiques entre toutes les pages,
  le calculateur et le menu).
- **Les noms de fichiers image** (`assets/img/...`) sont ceux du site d'origine —
  à remplacer par vos propres photos, même noms de variables ou renommés.
- **Les avis clients** visibles dans `index.html` / `realisations.html` sont des
  exemples — à remplacer uniquement par de vrais avis (voir `CLAUDE.md`,
  section règles de contenu).

## Comment les donner à Claude

Dans le prompt de démarrage (`PROMPT-00-demarrage.md`), ajoutez simplement :

> « Les fichiers `index.html`, `contact.html`, `offre-template.html`,
> `ville-template.html`, `blog.html`, `blog/article-comparatif-template.html`,
> `realisations.html`, `page-autorite-template.html`, `mentions-legales.html`
> et `politique-confidentialite.html` sont déjà dans `site/` : la structure
> HTML réelle à adapter, pas à reconstruire. Remplace les `{{VARIABLES}}`,
> réécris les textes avec mes vraies informations, et duplique les fichiers
> `-template` autant de fois que nécessaire (3 offres, une par ville, un par
> article de blog). »

Claude n'a alors plus qu'à **remplir et dupliquer**, pas à écrire 30 pages
HTML à partir de zéro.
